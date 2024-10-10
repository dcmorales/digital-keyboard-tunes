// audio-utils
// Contains the functions for the Key buttons.
// playNote initializes an audio context if there isn't one or resumes an existing one.
// The note info is then used in the noteValues array to find the proper frequency value.
// This value is passed into the audioContext to create the sound.
// Stopping the currentOscillator stops the sound.

import { noteValues } from '@/values/noteValues';
import type {
	FullNote,
	NoteLength,
	Waveform,
} from '@/types/keyboard-option-types';

let audioContext: AudioContext | null = null;
let currentOscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

const initializeAudioContext = () => {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
	return audioContext.resume();
};

function splitNoteString(note: FullNote): [string, number] {
	// match a letter with optional flat symbol (note letter) followed by a digit (octaveNum)
	const regex = /^([A-G][♭]?)([1-7])$/;
	const match = note.match(regex)!;
	const octaveNum = Number(match[2]);

	// return note as an array of the note letter and the octave it belongs to
	return [match[1], octaveNum];
}

function definePitch(note: FullNote) {
	const noteInfo = splitNoteString(note);

	return noteValues[noteInfo[1] - 1] // reduce octaveNum by 1 to get correct index of octave
		.filter((info) => note.includes(info.note)) // find object based on note letter provided
		.map((note) => note.frequency)[0]; // use frequency provided in the note object
}

export async function playNote(
	note: FullNote,
	waveform: Waveform
): Promise<void> {
	await initializeAudioContext(); // ensure AudioContext is ready

	const pitch = definePitch(note);

	if (currentOscillator) {
		// if an oscillator is already playing, change its frequency
		currentOscillator.frequency.setValueAtTime(
			pitch,
			audioContext!.currentTime
		);
	} else {
		// create and connect a new oscillator node and gain node
		currentOscillator = audioContext!.createOscillator();
		currentOscillator.frequency.value = pitch;
		currentOscillator.type = waveform;

		gainNode = audioContext!.createGain();
		gainNode.gain.setValueAtTime(1, audioContext!.currentTime); // start at full volume
		gainNode.connect(audioContext!.destination);
		currentOscillator.connect(gainNode);

		currentOscillator.start();
	}
}

// stop and reset oscillator and gain node
export function stopNote(): void {
	if (currentOscillator) {
		currentOscillator.stop();
		currentOscillator.disconnect();
		currentOscillator = null;
	}

	if (gainNode) {
		gainNode.disconnect();
		gainNode = null;
	}
}

// stop the note with a fade-out effect.
// used when stopping the final note in a scale
export function fadeOutNote(): void {
	if (currentOscillator && gainNode) {
		const fadeDuration = 0.2; // duration in seconds

		// set the gain to its current value immediately
		const currentGainValue = gainNode.gain.value;

		// start fading out
		gainNode.gain.setValueAtTime(currentGainValue, audioContext!.currentTime);
		gainNode.gain.linearRampToValueAtTime(
			0,
			audioContext!.currentTime + fadeDuration
		);

		// stop the oscillator after the fade-out duration
		setTimeout(() => {
			currentOscillator!.stop();
			currentOscillator!.disconnect();
			currentOscillator = null;

			gainNode!.disconnect();
			gainNode = null;
		}, fadeDuration * 1000);
	}
}

export function noteDurationInMs(
	selectedBpm: number,
	noteLength: NoteLength
): number {
	switch (noteLength) {
		case '1/4':
			return 60000 / selectedBpm;
		case '1/8':
			return 60000 / selectedBpm / 2;
		case '1/16':
			return 60000 / selectedBpm / 4;
	}
}

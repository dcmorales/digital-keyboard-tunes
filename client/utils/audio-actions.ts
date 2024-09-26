import { noteValues } from '@/values/noteValues';

let audioContext: AudioContext | null = null;
let currentOscillator: OscillatorNode | null = null;

const initializeAudioContext = () => {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
	return audioContext.resume();
};

function splitNoteString(note: string): [string, number] {
	// match a letter with optional flat symbol (note letter) followed by a digit (octaveNum)
	const regex = /^([A-G][♭]?)([1-7])$/;
	const match = note.match(regex)!;
	const octaveNum = Number(match[2]);

	// return note as an array of the note letter and the octave it belongs to
	return [match[1], octaveNum];
}

export async function playNote(note: string): Promise<void> {
	await initializeAudioContext(); // ensure AudioContext is ready

	const noteInfo = splitNoteString(note);

	const pitch = noteValues[noteInfo[1] - 1] // reduce octaveNum by 1 to get correct index of octave
		.filter((info) => note.includes(info.note)) // find object based on note letter provided
		.map((note) => note.frequency)[0]; // use frequency provided in the note object

	// stop any currently playing note before starting a new one
	stopNote();

	// create and connect a new oscillator node, default waveform is sine
	currentOscillator = audioContext!.createOscillator();
	currentOscillator.frequency.value = pitch;
	currentOscillator.connect(audioContext!.destination);
	currentOscillator.start();
}

// stop and reset oscillator
export function stopNote(): void {
	if (currentOscillator) {
		currentOscillator.stop();
		currentOscillator = null;
	}
}

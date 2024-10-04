// audio-control-functions
// Contains the functions for the audio-control buttons.
// For playSelectedNotes, each note in the fullNotes array will play and
// be set as active (which will highlight the note). After a delay,
// the note will be stopped and removed from active (removing the highlight).

import type { FullNote, Waveform } from '@/types/keyboard-option-types';
import { playNote, stopNote } from '@/utils/key-functions';

export function playSelectedNotes(
	fullNotes: FullNote[],
	waveform: Waveform,
	setActiveNote: (note: FullNote | null) => void
): void {
	fullNotes.forEach((fullNote, index) => {
		const playDelay = index * 400;

		setTimeout(() => {
			setActiveNote(fullNote);
			playNote(fullNote, waveform);

			setTimeout(() => {
				stopNote();
				setActiveNote(null);
			}, 200);
		}, playDelay);
	});
}

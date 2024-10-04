// audio-control-functions

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

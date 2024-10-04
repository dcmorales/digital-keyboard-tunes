// audio-control-functions

import type { FullNote, Waveform } from '@/types/keyboard-option-types';
import { playNote, stopNote } from '@/utils/key-functions';

export function playSelectedNotes(
	fullNotes: FullNote[],
	waveform: Waveform
): void {
	fullNotes.forEach((fullNote, index) => {
		const playDelay = index * 400;

		setTimeout(() => {
			playNote(fullNote, waveform);

			setTimeout(() => {
				stopNote();
			}, 200);
		}, playDelay);
	});
}

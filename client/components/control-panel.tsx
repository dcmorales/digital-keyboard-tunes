// control-panel

'use client';

import AudioControls from '@/components/audio-controls';
import KeyboardSelected from '@/components/keyboard-selected';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settingsOptions';

export default function ControlPanel(): JSX.Element {
	const { selectedKey, selectedOctave } = useKeyboardOptions();

	// Create a new array starting at the selectedKey. Add the selectedOctave to each string to create a fullNote.
	// Any note that was originally before the selectedKey will be placed at the end of the new array.
	// The octave will also increase for these notes.
	// End the array with the first key of the next octave.
	function rearrangeNotes(): FullNote[] {
		const startIndex = noteOptions.indexOf(selectedKey);
		const firstSegment = noteOptions
			.slice(startIndex)
			.map((note) => note + selectedOctave) as FullNote[];
		const secondSegment = noteOptions
			.slice(0, startIndex)
			.map((note) => note + (selectedOctave + 1)) as FullNote[];
		const endNote = (selectedKey + (selectedOctave + 1)) as FullNote;

		return firstSegment.concat(secondSegment, endNote);
	}

	const fullNotes = rearrangeNotes();

	return (
		<div role="region" aria-label="Audio controls and selected keyboard">
			<AudioControls fullNotes={fullNotes} />

			<KeyboardSelected fullNotes={fullNotes} />
		</div>
	);
}

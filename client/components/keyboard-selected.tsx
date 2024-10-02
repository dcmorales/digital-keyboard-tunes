// keyboard-selected
// Displays one single octave beginning with the selectedKey at the selectedOctave
// and ending with the first key of the next octave. It contains 13 keys

'use client';

import Octave from '@/components/octave';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { FullNote } from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settingsOptions';

export default function KeyboardSelected(): JSX.Element {
	const { selectedKey, selectedOctave } = useKeyboardOptions();

	// Create a new array starting at the selectedKey. Add the selectedOctave to each string.
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

	return (
		<div
			className="keyboard--selected"
			role="group"
			aria-label="Selected keyboard"
		>
			<Octave fullNotes={rearrangeNotes()} />
		</div>
	);
}

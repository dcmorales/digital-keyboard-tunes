// keyboard-selected
// Contains an octave with 13 keys and audio controls for playing the octave.
// The octave begins with the selectedKey at the selectedOctave and ends with
// the first key of the next octave. Both the octave and the functions for the
// audio controls depend on the selections made in the keyboard-settings.

'use client';

import AudioControls from '@/components/audio-controls';
import Octave from '@/components/octave';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settingsOptions';
import styles from './keyboard-selected.module.scss';

export default function KeyboardSelected(): JSX.Element {
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
		<div
			className={styles.keyboardSelected}
			role="region"
			aria-label="Selected Keyboard: audio controls and keys"
		>
			<AudioControls fullNotes={fullNotes} />

			<Octave fullNotes={fullNotes} />
		</div>
	);
}

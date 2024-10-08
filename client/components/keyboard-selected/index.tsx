// keyboard-selected
// Contains an octave with 13 keys and audio controls for playing the octave.
// The octave begins with the selectedKey at the selectedOctave and ends with
// the first key of the next octave. Both the octave and the functions for the
// audio controls depend on the selections made in the keyboard-settings.

'use client';

import AudioControls from '@/components/audio-controls';
import Octave from '@/components/octave';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import styles from './keyboard-selected.module.scss';

export default function KeyboardSelected(): JSX.Element {
	const { fullNotesOctave } = useKeyboardOptions();

	return (
		<div
			className={styles.keyboardSelected}
			role="region"
			aria-label="Selected Keyboard: audio controls and keys"
		>
			<AudioControls />

			<Octave fullNotes={fullNotesOctave} />
		</div>
	);
}

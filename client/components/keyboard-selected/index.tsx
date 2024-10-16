// keyboard-selected
// Contains an octave with 13 keys, audio controls for playing / stopping
// the octave, and displays the notes that were just played after clicking.
// The octave begins with the selectedKey at the selectedOctave and ends with
// the first key of the next octave. After an initial play in audio-controls,
// notes-display will show the unique notes just played.

'use client';

import { useState } from 'react';

import AudioControls from '@/components/audio-controls';
import NotesDisplay from '@/components/notes-display';
import Octave from '@/components/octave';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import styles from './keyboard-selected.module.scss';

export default function KeyboardSelected(): JSX.Element {
	const { fullNotesOctave } = useKeyboardOptions();
	const [lastPlayedNotes, setLastPlayedNotes] = useState<FullNote[]>([]);

	return (
		<div
			className={styles.keyboardSelected}
			role="region"
			aria-label="Selected Keyboard: audio controls and keys"
		>
			<div className={styles.keysAndControlsContainer}>
				<AudioControls
					lastPlayedNotes={lastPlayedNotes}
					setLastPlayedNotes={setLastPlayedNotes}
				/>

				<Octave fullNotes={fullNotesOctave} />
			</div>

			{lastPlayedNotes.length > 0 && (
				<NotesDisplay lastPlayedNotes={lastPlayedNotes} />
			)}
		</div>
	);
}

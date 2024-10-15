// keyboard-selected
// Contains an octave with 13 keys and audio controls for playing the octave.
// The octave begins with the selectedKey at the selectedOctave and ends with
// the first key of the next octave. Both the octave and the functions for the
// audio controls depend on the selections made in the keyboard-settings.

'use client';

import { useState } from 'react';

import AudioControls from '@/components/audio-controls';
import Octave from '@/components/octave';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import styles from './keyboard-selected.module.scss';

export default function KeyboardSelected(): JSX.Element {
	const { fullNotesOctave, selectedRepeatNum } = useKeyboardOptions();
	const [lastPlayedNotes, setLastPlayedNotes] = useState<FullNote[]>([]);

	const uniqueNotes = lastPlayedNotes.filter(
		(note, index) => lastPlayedNotes.indexOf(note) === index
	);

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
				<div className={styles.notesPlayedContainer}>
					Notes played:
					{uniqueNotes.map((note, index) => (
						<span key={note}>
							{' '}
							{note.includes('♭') ? (
								<>
									{note[0]}
									<span className={styles.flatSymbol}> {note[1]}</span>
									{note[2]}
								</>
							) : (
								note
							)}
							{index < uniqueNotes.length - 1 && ' - '}
						</span>
					))}{' '}
					x {selectedRepeatNum + 1}
				</div>
			)}
		</div>
	);
}

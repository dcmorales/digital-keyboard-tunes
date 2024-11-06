// notes-display
// Displays the unique notes that were just played based on selections made.
// The number of times the scale played is also displayed and dependent
// on the selectedRepeatNum. For example, if selectedRepeatNum is 2, the
// component will display 'x 3' (1 initial play + 2 repeats). lastPlayedNotes
// will update when either the shuffle or play button (in audio-controls) are clicked.

import { useEffect, useRef, useState } from 'react';

import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import styles from './notes-display.module.scss';

interface NotesDisplayProps {
	lastPlayedNotes: FullNote[];
}

export default function NotesDisplay({ lastPlayedNotes }: NotesDisplayProps) {
	const { selectedRepeatNum } = useKeyboardOptions();
	const [staticRepeatNum, setStaticRepeatNum] = useState(selectedRepeatNum);
	const selectedRepeatNumRef = useRef(selectedRepeatNum);

	useEffect(() => {
		// static repeat number reflects selections from lastPlayedNotes
		// and not the current selection from the dropdown in settings
		setStaticRepeatNum(selectedRepeatNumRef.current);
	}, [lastPlayedNotes]);

	useEffect(() => {
		// update the ref to the latest selectedRepeatNum
		selectedRepeatNumRef.current = selectedRepeatNum;
	}, [selectedRepeatNum]);

	const uniqueNotes = Array.from(new Set(lastPlayedNotes));

	const renderNote = (note: FullNote): JSX.Element | string => {
		// notes that include the flat symbol will render in a span
		// so that the symbol can be styled / positioned correctly
		if (note.includes('♭')) {
			return (
				<span className={styles.flatNote}>
					{note[0]}
					<span className={styles.flatSymbol}>{note[1]}</span>
					{note[2]}
				</span>
			);
		}
		return note;
	};

	return (
		<section
			className={styles.notesDisplay}
			aria-labelledby="notes-display-heading"
		>
			<h3 id="notes-display-heading" className={styles.heading}>
				Notes played:{' '}
			</h3>
			{uniqueNotes.map((note, index) => (
				<span key={note}>
					{renderNote(note)}
					{index < uniqueNotes.length - 1 && ' - '}
				</span>
			))}{' '}
			x {staticRepeatNum + 1}
		</section>
	);
}

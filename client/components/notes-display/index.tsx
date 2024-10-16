// notes-display

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
		setStaticRepeatNum(selectedRepeatNumRef.current);
	}, [lastPlayedNotes]);

	useEffect(() => {
		// update the ref to the latest selectedRepeatNum
		selectedRepeatNumRef.current = selectedRepeatNum;
	}, [selectedRepeatNum]);

	const uniqueNotes = Array.from(new Set(lastPlayedNotes));

	const renderNote = (note: FullNote): JSX.Element | string => {
		if (note.includes('♭')) {
			return (
				<>
					{note[0]}
					<span className={styles.flatSymbol}>{note[1]}</span>
					{note[2]}
				</>
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

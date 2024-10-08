// key
// Each key within the keyboard. Contains click actions to play and highlight a specific note.
// The note prop will determine the keys style, label, and the sound played.
// From the context, selectedWaveform will also help determine the sound played.
// If the activeNote matches the key's note, the key will be appear 'active.
// If they key's note is included in the selected scale, it will appear highlighted.

'use client';

import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { playNote, stopNote } from '@/utils/key-utils';
import styles from './key.module.scss';

interface KeyProps {
	note: FullNote;
	isSelectedKeyboard: boolean;
}

export default function Key({
	note,
	isSelectedKeyboard,
}: KeyProps): JSX.Element {
	const { activeNote, setActiveNote, selectedWaveform, orderedScaleNotes } =
		useKeyboardOptions();

	const handleMouseDown = (): void => {
		playNote(note, selectedWaveform);
		setActiveNote(note);
	};

	const handleMouseUp = (): void => {
		stopNote();
		setActiveNote(null);
	};

	const isActive = activeNote === note;
	const {
		key,
		black,
		white,
		active,
		keyboardFull,
		keyboardSelected,
		highlight,
		flatSymbol,
	} = styles;

	return (
		<button
			aria-label={`Play the ${note} note`}
			className={`${key} ${note.includes('♭') ? black : white} ${isSelectedKeyboard ? keyboardSelected : keyboardFull} ${isActive ? active : ''} ${orderedScaleNotes.includes(note) ? highlight : ''}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
		>
			{note.includes('♭') ? (
				<>
					{note[0]} <span className={flatSymbol}> {note[1]}</span>
					{note[2]}
				</>
			) : (
				note
			)}
		</button>
	);
}

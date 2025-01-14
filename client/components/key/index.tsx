// key
// Each key within the keyboard. Contains click actions to play and highlight a specific note.
// The note prop will determine the key's style, label, and the sound played.
// From the context, selectedWaveform will also help determine the sound played.
// If the activeNote matches the key's note, the key will appear 'active'.
// If the key's note is included in the selected scale, it will appear highlighted.
// If a scale is playing, the key will be disabled.

'use client';

import type { KeyboardEvent } from 'react';

import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { fadeOutNote, playNote } from '@/utils/audio-utils';
import styles from './key.module.scss';

interface KeyProps {
	note: FullNote;
	isSelectedKeyboard: boolean;
}

export default function Key({
	note,
	isSelectedKeyboard,
}: KeyProps): JSX.Element {
	const {
		activeNote,
		setActiveNote,
		selectedWaveform,
		orderedScaleNotes,
		isPlaying,
	} = useKeyboardOptions();
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

	const handleMouseDown = (): void => {
		playNote(note, selectedWaveform);
		setActiveNote(note);
	};

	// limit the keyboard keys that trigger playing the note, otherwise
	// the tab key will play each note while tabbing through for navigation
	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleMouseDown();
		}
	};

	const handleMouseUp = (): void => {
		fadeOutNote();
		setActiveNote(null);
	};

	return (
		<button
			aria-label={`Play the ${note} note`}
			className={`${key} ${note.includes('♭') ? black : white} ${isSelectedKeyboard ? keyboardSelected : keyboardFull} ${isActive ? active : ''} ${orderedScaleNotes.includes(note) ? highlight : ''}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onKeyDown={handleKeyDown}
			onKeyUp={handleMouseUp}
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
			disabled={isPlaying}
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

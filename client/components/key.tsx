// key
// Each key within the keyboard. A client component with click actions.
// The note prop will determine the keys style, label, and the sound played.

'use client';

import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { FullNote } from '@/types/keyboard-option-types';
import { playNote, stopNote } from '@/utils/audio-functions';

interface KeyProps {
	note: FullNote;
}

export default function Key({ note }: KeyProps): JSX.Element {
	const { selectedWaveform } = useKeyboardOptions();

	const handleMouseDown = (): void => {
		playNote(note, selectedWaveform);
	};

	const handleMouseUp = (): void => {
		stopNote();
	};

	return (
		<button
			aria-label={`Play the ${note} note`}
			className={`key key--${note.includes('♭') ? 'black' : 'white'}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
		>
			{note.includes('♭') ? (
				<>
					{note[0]} <span className="key__flat"> {note[1]}</span>
					{note[2]}
				</>
			) : (
				note
			)}
		</button>
	);
}

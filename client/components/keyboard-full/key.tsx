// key
// Each key within the keyboard. A client component with click actions.
// The note prop will determine the keys style, label, and the sound played.

'use client';

import { playNote, stopNote } from '@/utils/audio-actions';

interface KeyProps {
	note: string;
}

export default function Key({ note }: KeyProps): JSX.Element {
	const handleMouseDown = (): void => {
		playNote(note);
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

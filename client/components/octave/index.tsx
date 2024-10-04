// octave
// A container grouping the keys together.
// Each octave within keyboard-full will have 12 keys while the octave in keyboard-selected
// will have 13 keys (12 standard keys plus the starting key of the next octave).
// Each fullNote in the fullNotes array begins with a note and ends with an octave number, for example 'C4'

import Key from '@/components/key';
import type { FullNote } from '@/types/keyboard-option-types';
import styles from './octave.module.scss';

interface OctaveProps {
	fullNotes: FullNote[];
}

export default function Octave({ fullNotes }: OctaveProps): JSX.Element {
	const isSelectedKeyboard = fullNotes.length === 13;

	return (
		<div
			className={`${styles.octave} ${isSelectedKeyboard ? styles.keyboardSelected : styles.keyboardFull}`}
			role="group"
			aria-label={`Octave for ${fullNotes[0]}`}
		>
			{fullNotes.map((fullNote) => (
				<Key
					key={fullNote}
					note={fullNote}
					isSelectedKeyboard={isSelectedKeyboard}
				/>
			))}
		</div>
	);
}

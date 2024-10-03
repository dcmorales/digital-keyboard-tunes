// octave
// A container grouping the keys together.
// Each octave within keyboard-full will have 12 keys while the octave in keyboard-selected
// will have 13 keys (12 standard keys plus the starting key of the next octave).
// Each fullNote in the fullNotes array begins with a note and ends with an octave number, for example 'C3'

import Key from '@/components/key';
import { FullNote } from '@/types/keyboard-option-types';

interface OctaveProps {
	fullNotes: FullNote[];
}

export default function Octave({ fullNotes }: OctaveProps): JSX.Element {
	return (
		<div
			className="octave"
			role="group"
			aria-label={`Octave for ${fullNotes[0]}`}
		>
			{fullNotes.map((fullNote) => (
				<Key key={fullNote} note={fullNote} />
			))}
		</div>
	);
}

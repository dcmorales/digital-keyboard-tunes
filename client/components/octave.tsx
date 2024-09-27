// octave
// A container grouping the keys together.
// Each octave within the keyboard-full will have 12 keys while the octave in the
// keyboard-selected will have 13 keys (12 standard keys plus the starting key of the next octave).
// Each string in the fullNotes array begins with a note and ends with an octave number, for example 'C3'
// This will determine the frequency value for each individual key.

import Key from '@/components/key';

interface OctaveProps {
	fullNotes: string[];
}

export default function Octave({ fullNotes }: OctaveProps): JSX.Element {
	return (
		<div
			className="octave"
			role="group"
			aria-label={`Octave for ${fullNotes[0]}`}
		>
			{fullNotes.map((fullNote) => {
				return <Key key={fullNote} note={fullNote} />;
			})}
		</div>
	);
}

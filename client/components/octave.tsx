// octave
// A container grouping the 12 available keys together.
// THe octaveNum prop is used to determine which octave the keys belong to.
// This along with the noteOption will determine the frequency value for each individual key.

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

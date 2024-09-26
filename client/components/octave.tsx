// octave
// A container grouping the 12 available keys together.
// THe octaveNum prop is used to determine which octave the keys belong to.
// This along with the noteOption will determine the frequency value for each individual key.

import Key from '@/components/key';

interface OctaveProps {
	octaveNum: number;
}

const noteOptions = [
	'C',
	'D♭',
	'D',
	'E♭',
	'E',
	'F',
	'G♭',
	'G',
	'A♭',
	'A',
	'B♭',
	'B',
];

export default function Octave({ octaveNum }: OctaveProps): JSX.Element {
	return (
		<div className="octave" role="group" aria-label={`Octave #${octaveNum}`}>
			{noteOptions.map((noteOption) => {
				return <Key key={noteOption} note={`${noteOption}${octaveNum}`} />;
			})}
		</div>
	);
}

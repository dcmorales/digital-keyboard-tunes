import Key from './key';

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

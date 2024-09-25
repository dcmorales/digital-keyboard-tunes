import Key from './key';

interface OctaveProps {
	octaveNum: number;
}

const noteOptions = [
	'C',
	'D&#9837;',
	'D',
	'E&#9837;',
	'E',
	'F',
	'G&#9837;',
	'G',
	'A&#9837;',
	'A',
	'B&#9837;',
	'B',
];

export default function Octave({ octaveNum }: OctaveProps): JSX.Element {
	return (
		<div role="group" aria-label={`Octave #${octaveNum}`}>
			{noteOptions.map((noteOption) => {
				return <Key key={noteOption} note={`${noteOption}${octaveNum}`} />;
			})}
		</div>
	);
}

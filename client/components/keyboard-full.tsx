// keyboard-full
// Essentially a container component for grouping the Octave components.
// This keyboard contains seven octaves.

import Scrollbar from '@/components/common/scrollbar';
import Octave from '@/components/octave';

// create an array of numbers 1-7
const octaveNums = Array.from({ length: 7 }, (_, index) => index + 1);

export const noteOptions = [
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

export default function KeyboardFull(): JSX.Element {
	return (
		<Scrollbar>
			<div
				className="keyboard--full"
				role="group"
				aria-label="Full keyboard keys"
			>
				{octaveNums.map((octaveNum) => {
					const fullNotes = noteOptions.map((note) => note + octaveNum);
					return <Octave key={octaveNum} fullNotes={fullNotes} />;
				})}
			</div>
		</Scrollbar>
	);
}

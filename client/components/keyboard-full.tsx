// keyboard-full
// Essentially a container component for grouping the Octave components.
// This keyboard contains seven octaves.

import Octave from '@/components/octave';

// create an array of numbers 1-7
const octaveNums = Array.from({ length: 7 }, (_, index) => index + 1);

export default function KeyboardFull(): JSX.Element {
	return (
		<div
			className="keyboard--full"
			role="group"
			aria-label="Full keyboard keys"
		>
			{octaveNums.map((octaveNum) => {
				return <Octave key={octaveNum} octaveNum={octaveNum} />;
			})}
		</div>
	);
}

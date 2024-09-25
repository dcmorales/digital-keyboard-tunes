import Octave from './octave';

// create an array of numbers 1-8
const octaveNums = Array.from({ length: 8 }, (_, index) => index + 1);

export default function KeyboardFull(): JSX.Element {
	return (
		<div role="group" aria-label="Full Keyboard Keys">
			{octaveNums.map((octaveNum) => {
				return <Octave key={octaveNum} octNum={octaveNum} />;
			})}
		</div>
	);
}

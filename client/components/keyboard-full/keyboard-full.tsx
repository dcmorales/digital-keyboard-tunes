import Octave from './octave';

// create an array of numbers 1-7
const octaveNums = Array.from({ length: 7 }, (_, index) => index + 1);

export default function KeyboardFull(): JSX.Element {
	return (
		<div className="keyboard" role="group" aria-label="Full Keyboard Keys">
			{octaveNums.map((octaveNum) => {
				return <Octave key={octaveNum} octaveNum={octaveNum} />;
			})}
		</div>
	);
}

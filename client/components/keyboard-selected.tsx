// keyboard-selected

import { noteOptions } from '@/components/keyboard-full';
import Octave from '@/components/octave';

export default function KeyboardSelected(): JSX.Element {
	const selectedKey = 'C';
	const selectedOctave = 3;

	// create a new array that includes the selectedOctave and starts with the selectedKey
	// any note that was originally before the selectedKey will now show up at the end of the new array;
	// the octave will also increase for these notes
	function rearrangeNotes() {
		const startIndex = noteOptions.indexOf(selectedKey);
		const firstSegment = noteOptions
			.slice(startIndex)
			.map((note) => note + selectedOctave);
		const secondSegment = noteOptions
			.slice(0, startIndex)
			.map((note) => note + (selectedOctave + 1));

		return firstSegment.concat(secondSegment);
	}

	return (
		<div className="keyboard--full" role="group" aria-label="Selected keyboard">
			<Octave fullNotes={rearrangeNotes()} />
		</div>
	);
}

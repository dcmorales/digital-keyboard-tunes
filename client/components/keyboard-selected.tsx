// keyboard-selected
// Displays one single octave beginning with the selectedKey at the selectedOctave
// and ending with the first key of the next octave. It contains 13 keys.

'use client';

import Octave from '@/components/octave';
import type { FullNote } from '@/types/keyboard-option-types';

interface KeyboardSelectedProps {
	fullNotes: FullNote[];
}

export default function KeyboardSelected({
	fullNotes,
}: KeyboardSelectedProps): JSX.Element {
	return (
		<div
			className="keyboard--selected"
			role="group"
			aria-label="Selected keyboard"
		>
			<Octave fullNotes={fullNotes} />
		</div>
	);
}

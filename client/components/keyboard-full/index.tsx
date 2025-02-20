// keyboard-full
// A container component for grouping the Octave components. This keyboard contains seven octaves;
// each octave is made up of 12 fullNotes (i.e., a note from noteOptions plus an octaveNum).
// It doesn't display on small screens.

import Octave from '@/components/octave';
import type { FullNote, OctaveNum } from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settings-options';
import styles from './keyboard-full.module.scss';

// create an array of numbers 1-7
const octaveNums: OctaveNum[] = Array.from(
	{ length: 7 },
	(_, index) => (index + 1) as OctaveNum
);

export default function KeyboardFull(): JSX.Element {
	return (
		<div
			className={styles.keyboardFull}
			role="group"
			aria-label="Full keyboard keys"
		>
			{octaveNums.map((octaveNum) => {
				const fullNotes = noteOptions.map(
					(note) => note + octaveNum
				) as FullNote[];

				return <Octave key={octaveNum} fullNotes={fullNotes} />;
			})}
		</div>
	);
}

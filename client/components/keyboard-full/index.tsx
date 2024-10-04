// keyboard-full
// A container component for grouping the Octave components.
// This keyboard contains seven octaves; each octave contains a key for every note within the noteOptions.
// It doesn't display on small screens and uses a scrollbar for screens that can't fit all octaves.

import Scrollbar from '@/components/common/scrollbar';
import Octave from '@/components/octave';
import type { FullNote, OctaveNum } from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settingsOptions';
import styles from './keyboard-full.module.scss';

// create an array of numbers 1-7
const octaveNums: OctaveNum[] = Array.from(
	{ length: 7 },
	(_, index) => (index + 1) as OctaveNum
);

export default function KeyboardFull(): JSX.Element {
	return (
		<Scrollbar>
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
		</Scrollbar>
	);
}

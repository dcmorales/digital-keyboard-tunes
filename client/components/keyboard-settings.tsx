// keyboard-settings

import { noteOptions } from '@/components/keyboard-full';

export default function KeyboardSettings(): JSX.Element {
	return (
		<div role="group" aria-label="Keyboard settings">
			<select aria-label="Select a key">
				{noteOptions.map((note) => {
					return (
						<option key={`${note}`} value={`${note}`}>
							{note}
						</option>
					);
				})}
			</select>
		</div>
	);
}

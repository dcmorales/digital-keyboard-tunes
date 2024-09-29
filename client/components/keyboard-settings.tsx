// keyboard-settings

import { noteOptions } from '@/components/keyboard-full';
import Dropdown from '@/components/common/dropdown';

export default function KeyboardSettings(): JSX.Element {
	return (
		<div role="group" aria-label="Keyboard settings">
			<Dropdown options={noteOptions} ariaLabel="Select a key" />
		</div>
	);
}

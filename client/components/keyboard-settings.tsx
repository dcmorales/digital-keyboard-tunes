// keyboard-settings

import { noteOptions } from '@/components/keyboard-full';
import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';

export default function KeyboardSettings(): JSX.Element {
	const { selectedKey, onKeyChange } = useKeyboardOptions();

	return (
		<div role="group" aria-label="Keyboard settings">
			<Dropdown
				options={noteOptions}
				ariaLabel="Select a key"
				title="Key"
				id="key"
				value={selectedKey}
				onChange={onKeyChange}
			/>
		</div>
	);
}

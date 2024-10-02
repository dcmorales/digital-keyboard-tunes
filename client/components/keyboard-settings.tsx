// keyboard-settings

import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { noteOptions } from '@/values/settingsOptions';

export default function KeyboardSettings(): JSX.Element {
	const { selectedKey, onKeyChange, selectedOctave, onOctaveChange } =
		useKeyboardOptions();

	return (
		<div
			className="keyboard-settings"
			role="group"
			aria-label="Keyboard settings"
		>
			<Dropdown
				options={noteOptions}
				ariaLabel="Select a key"
				title="Key"
				id="key"
				value={selectedKey}
				onChange={onKeyChange}
			/>

			<Dropdown
				options={['1', '2', '3', '4', '5', '6']}
				ariaLabel="Select an octave"
				title="Octave"
				id="octave"
				value={`${selectedOctave}`}
				onChange={onOctaveChange}
			/>
		</div>
	);
}

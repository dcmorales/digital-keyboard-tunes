// keyboard-settings

import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { settingsOptions } from '@/values/settingsOptions';

export default function KeyboardSettings(): JSX.Element {
	const { selectedKey, onKeyChange, selectedOctave, onOctaveChange } =
		useKeyboardOptions();
	const { key, octave } = settingsOptions;

	return (
		<div
			className="keyboard-settings"
			role="group"
			aria-label="Keyboard settings"
		>
			<Dropdown
				options={key.options}
				ariaLabel={key.ariaLabel}
				title={key.title}
				name={key.name}
				value={selectedKey}
				onChange={onKeyChange}
			/>

			<Dropdown
				options={octave.options}
				ariaLabel={octave.ariaLabel}
				title={octave.title}
				name={octave.name}
				value={`${selectedOctave}`}
				onChange={onOctaveChange}
			/>
		</div>
	);
}

// keyboard-settings

import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { settingsOptions } from '@/values/settingsOptions';

export default function KeyboardSettings(): JSX.Element {
	const {
		selectedKey,
		onKeyChange,
		selectedOctave,
		onOctaveChange,
		selectedWaveform,
		onWaveformChange,
	} = useKeyboardOptions();
	const { key, octave, waveform } = settingsOptions;

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

			<Dropdown
				options={waveform.options}
				ariaLabel={waveform.ariaLabel}
				title={waveform.title}
				name={waveform.name}
				value={selectedWaveform}
				onChange={onWaveformChange}
			/>
		</div>
	);
}

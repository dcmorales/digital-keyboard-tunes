// keyboard-settings
// A group of dropdown menus that act as settings for the keyboard.
// Each dropdown has static values provided from the settingsOptions object.
// The other values are provided by the global context and affect either the
// keys displayed in keyboard-selected or how the keys sound when played.

import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { settingsOptions } from '@/values/settingsOptions';
import styles from './keyboard-settings.module.scss';

export default function KeyboardSettings(): JSX.Element {
	const {
		selectedKey,
		onKeyChange,
		selectedOctave,
		onOctaveChange,
		selectedWaveform,
		onWaveformChange,
		selectedScale,
		onScaleChange,
		selectedOrder,
		onOrderChange,
		selectedNoteLength,
		onNoteLengthChange,
		selectedBpm,
		onBpmChange,
	} = useKeyboardOptions();

	const { key, octave, waveform, scale, order, noteLength, bpm } =
		settingsOptions;

	const settingDropdowns = [
		{ setting: key, value: selectedKey, onChange: onKeyChange },
		{ setting: octave, value: selectedOctave, onChange: onOctaveChange },
		{ setting: waveform, value: selectedWaveform, onChange: onWaveformChange },
		{ setting: scale, value: selectedScale, onChange: onScaleChange },
		{ setting: order, value: selectedOrder, onChange: onOrderChange },
		{
			setting: noteLength,
			value: selectedNoteLength,
			onChange: onNoteLengthChange,
		},
		{ setting: bpm, value: selectedBpm, onChange: onBpmChange },
	];

	return (
		<div
			className={styles.keyboardSettings}
			role="group"
			aria-label="Keyboard settings"
		>
			{settingDropdowns.map(({ setting, value, onChange }) => (
				<Dropdown
					key={setting.name}
					options={setting.options}
					ariaLabel={setting.ariaLabel}
					title={setting.title}
					name={setting.name}
					value={value}
					onChange={onChange}
				/>
			))}
		</div>
	);
}

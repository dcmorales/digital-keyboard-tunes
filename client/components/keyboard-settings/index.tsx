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
	} = useKeyboardOptions();
	const { key, octave, waveform, scale, order } = settingsOptions;

	return (
		<div
			className={styles.keyboardSettings}
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
				value={selectedOctave}
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

			<Dropdown
				options={scale.options}
				ariaLabel={scale.ariaLabel}
				title={scale.title}
				name={scale.name}
				value={selectedScale}
				onChange={onScaleChange}
			/>

			<Dropdown
				options={order.options}
				ariaLabel={order.ariaLabel}
				title={order.title}
				name={order.name}
				value={selectedOrder}
				onChange={onOrderChange}
			/>
		</div>
	);
}

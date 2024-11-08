// keyboard-settings
// A group of dropdowns that act as settings for the keyboard.
// Each dropdown has static values provided from the settingsOptions object.
// The select tag values and the event handlers are provided by the global context.
// Together these settings affect either the keys displayed in
// keyboard-selected or how the keys sound when played.
// All dropdowns are disabled while a scale is playing.

import Dropdown from '@/components/common/dropdown';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { TotalNotesNum } from '@/types/keyboard-option-types';
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
		selectedTotalNotes,
		onTotalNotesChange,
		selectedRepeatNum,
		onRepeatNumChange,
		orderedScaleNotes,
		isPlaying,
	} = useKeyboardOptions();

	const {
		key,
		octave,
		waveform,
		scale,
		order,
		noteLength,
		bpm,
		totalNotes,
		repeatNum,
	} = settingsOptions;

	// in the totalNotes object, update the options array to have
	// a max length equal to the length of the selected scale,
	// the array should start here then decrement down to 1
	const scaleLength = orderedScaleNotes.length;
	totalNotes.options = Array.from(
		{ length: scaleLength },
		(_, index) => (scaleLength - index) as TotalNotesNum
	);

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
		{
			setting: totalNotes,
			value: selectedTotalNotes,
			onChange: onTotalNotesChange,
		},
		{
			setting: repeatNum,
			value: selectedRepeatNum,
			onChange: onRepeatNumChange,
		},
	];

	return (
		<div
			className={styles.keyboardSettings}
			role="group"
			aria-label="Keyboard settings"
		>
			{settingDropdowns.map(({ setting, value, onChange }) => (
				<div className={styles.dropdownContainer} key={setting.name}>
					<Dropdown
						options={setting.options}
						ariaLabel={setting.ariaLabel}
						title={setting.title}
						name={setting.name}
						tooltip={setting.tooltip}
						value={value}
						disabled={isPlaying}
						onChange={onChange}
					/>
				</div>
			))}
		</div>
	);
}

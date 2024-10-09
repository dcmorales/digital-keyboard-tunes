// context-test-component
// A component with ui for testing all of the state provided in the context.

import type { ChangeEvent } from 'react';

import { useKeyboardOptions } from '@/context/keyboard-options-context';

interface SelectInputProps {
	label: string;
	value: string | number;
	options: string[] | number[];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({ label, value, options, onChange }: SelectInputProps) => (
	<div>
		<label htmlFor={label}>Select {label}:</label>
		<select id={label} name={label} value={value} onChange={onChange}>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
		<p>{`Selected ${label}: ${value}`}</p>
	</div>
);

export default function ContextTestComponent(): JSX.Element {
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
		activeNote,
		setActiveNote,
		orderedScaleNotes,
	} = useKeyboardOptions();

	return (
		<div>
			<SelectInput
				label="key"
				value={selectedKey}
				options={['C', 'D', 'E']}
				onChange={onKeyChange}
			/>

			<SelectInput
				label="octave"
				value={selectedOctave}
				options={[3, 4, 5]}
				onChange={onOctaveChange}
			/>

			<SelectInput
				label="waveform"
				value={selectedWaveform}
				options={['sine', 'square', 'triangle', 'sawtooth']}
				onChange={onWaveformChange}
			/>

			<SelectInput
				label="scale"
				value={selectedScale}
				options={['chromatic', 'major', 'blues']}
				onChange={onScaleChange}
			/>

			<SelectInput
				label="order"
				value={selectedOrder}
				options={['ascending', 'descending', 'random']}
				onChange={onOrderChange}
			/>

			<SelectInput
				label="note-length"
				value={selectedNoteLength}
				options={['1/4', '1/8', '1/16']}
				onChange={onNoteLengthChange}
			/>

			<SelectInput
				label="bpm"
				value={selectedBpm}
				options={[100, 110, 120]}
				onChange={onBpmChange}
			/>

			<div>
				<p>Active Note: {activeNote || 'None'}</p>
				<button onClick={() => setActiveNote('C4')}>
					Set Active Note to C4
				</button>
				<button onClick={() => setActiveNote('D4')}>
					Set Active Note to D4
				</button>
				<button onClick={() => setActiveNote(null)}>Clear Active Note</button>
			</div>
			<div>
				<p>Ordered scale notes: {orderedScaleNotes.join('-')}</p>
			</div>
		</div>
	);
}

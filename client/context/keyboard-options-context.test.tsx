import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from './keyboard-options-context';

const TestComponent = () => {
	const {
		selectedKey,
		onKeyChange,
		selectedOctave,
		onOctaveChange,
		selectedWaveform,
		onWaveformChange,
	} = useKeyboardOptions();

	return (
		<div>
			<div>
				<label htmlFor="key-select">Select Key:</label>
				<select
					id="key-select"
					name="key"
					value={selectedKey}
					onChange={onKeyChange}
				>
					<option value="C">C</option>
					<option value="D">D</option>
					<option value="E">E</option>
				</select>
				<p>Selected Key: {selectedKey}</p>
			</div>

			<div>
				<label htmlFor="octave-select">Select Octave:</label>
				<select
					id="octave-select"
					name="octave"
					value={selectedOctave}
					onChange={onOctaveChange}
				>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
				<p>Selected Octave: {selectedOctave}</p>
			</div>

			<div>
				<label htmlFor="waveform-select">Select Waveform:</label>
				<select
					id="waveform-select"
					name="waveform"
					value={selectedWaveform}
					onChange={onWaveformChange}
				>
					<option value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
					<option value="sawtooth">Sawtooth</option>
				</select>
				<p>Selected Waveform: {selectedWaveform}</p>
			</div>
		</div>
	);
};

describe('KeyboardOptionsProvider', () => {
	it('provides the initial selected key and octave', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		expect(screen.getByText('Selected Key: C')).toBeInTheDocument();
		expect(screen.getByText('Selected Octave: 4')).toBeInTheDocument();
	});

	it('updates the selected key on change event', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		const select = screen.getByLabelText('Select Key:');

		fireEvent.change(select, { target: { value: 'D' } });

		expect(screen.getByText('Selected Key: D')).toBeInTheDocument();
	});

	it('updates the selected octave on change event', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		const select = screen.getByLabelText('Select Octave:');

		fireEvent.change(select, { target: { value: '5' } });

		expect(screen.getByText('Selected Octave: 5')).toBeInTheDocument();
	});

	it('updates the selected waveform on change event', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		const select = screen.getByLabelText('Select Waveform:');

		fireEvent.change(select, { target: { value: 'square' } });

		expect(screen.getByText('Selected Waveform: square')).toBeInTheDocument();
	});

	it('throws an error when used outside of the provider', () => {
		const TestComponentOutsideProvider = () => {
			useKeyboardOptions();
			return null;
		};
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		expect(() => {
			render(<TestComponentOutsideProvider />);
		}).toThrow(
			'useKeyboardOptions must be used within a KeyboardOptionsProvider'
		);

		consoleErrorSpy.mockRestore();
	});
});

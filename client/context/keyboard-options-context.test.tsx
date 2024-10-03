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
		selectedScale,
		onScaleChange,
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

			<div>
				<label htmlFor="scale-select">Select Scale:</label>
				<select
					id="scale-select"
					name="scale"
					value={selectedScale}
					onChange={onScaleChange}
				>
					<option value="chromatic">Chromatic</option>
					<option value="major">Major</option>
				</select>
				<p>Selected Scale: {selectedScale}</p>
			</div>
		</div>
	);
};

const renderWithProvider = () => {
	render(
		<KeyboardOptionsProvider>
			<TestComponent />
		</KeyboardOptionsProvider>
	);
};

const changeSelection = (label: string, value: string) => {
	const select = screen.getByLabelText(label);
	fireEvent.change(select, { target: { value } });
};

describe('KeyboardOptionsProvider', () => {
	it('provides the initial values', () => {
		renderWithProvider();

		expect(screen.getByText('Selected Key: C')).toBeInTheDocument();
		expect(screen.getByText('Selected Octave: 4')).toBeInTheDocument();
		expect(screen.getByText('Selected Waveform: sine')).toBeInTheDocument();
		expect(screen.getByText('Selected Scale: chromatic')).toBeInTheDocument();
	});

	it('updates the selected key on change event', () => {
		renderWithProvider();

		changeSelection('Select Key:', 'D');

		expect(screen.getByText('Selected Key: D')).toBeInTheDocument();
	});

	it('updates the selected octave on change event', () => {
		renderWithProvider();

		changeSelection('Select Octave:', '5');

		expect(screen.getByText('Selected Octave: 5')).toBeInTheDocument();
	});

	it('updates the selected waveform on change event', () => {
		renderWithProvider();

		changeSelection('Select Waveform:', 'square');

		expect(screen.getByText('Selected Waveform: square')).toBeInTheDocument();
	});

	it('updates the selected scale on change event', () => {
		renderWithProvider();

		changeSelection('Select Scale:', 'major');

		expect(screen.getByText('Selected Scale: major')).toBeInTheDocument();
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

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
		activeNote,
		setActiveNote,
		selectedScaleNotes,
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
					<option value="natural minor">Natural Minor</option>
					<option value="harmonic minor">Harmonic Minor</option>
					<option value="melodic minor">Melodic Minor</option>
					<option value="major pentatonic">Major Pentatonic</option>
					<option value="minor pentatonic">Minor Pentatonic</option>
					<option value="blues">Blues</option>
				</select>
				<p>Selected Scale: {selectedScale}</p>
			</div>

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
				<p>Selected Scale Notes: {selectedScaleNotes.join('-')}</p>
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
		expect(screen.getByText('Active Note: None')).toBeInTheDocument();
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

	it('updates the active note when setActiveNote is called', () => {
		renderWithProvider();

		fireEvent.click(
			screen.getByRole('button', { name: /set active note to C4/i })
		);
		expect(screen.getByText('Active Note: C4')).toBeInTheDocument();

		fireEvent.click(
			screen.getByRole('button', { name: /set active note to D4/i })
		);
		expect(screen.getByText('Active Note: D4')).toBeInTheDocument();

		fireEvent.click(screen.getByText('Clear Active Note'));
		expect(screen.getByText('Active Note: None')).toBeInTheDocument();
	});

	it('defines the correct set of selected notes based on octave and key', () => {
		renderWithProvider();

		changeSelection('Select Key:', 'D');
		changeSelection('Select Octave:', '5');

		const scaleTests = [
			{
				scale: 'chromatic',
				expected: 'D5-E♭5-E5-F5-G♭5-G5-A♭5-A5-B♭5-B5-C6-D♭6-D6',
			},
			{ scale: 'major', expected: 'D5-E5-G♭5-G5-A5-B5-D♭6-D6' },
			{ scale: 'natural minor', expected: 'D5-E5-F5-G5-A5-B♭5-C6-D6' },
			{ scale: 'harmonic minor', expected: 'D5-E5-F5-G5-A5-B♭5-D♭6-D6' },
			{ scale: 'melodic minor', expected: 'D5-E5-F5-G5-A5-B5-D♭6-D6' },
			{ scale: 'major pentatonic', expected: 'D5-E5-G♭5-A5-B5-D6' },
			{ scale: 'minor pentatonic', expected: 'D5-F5-G5-A5-C6-D6' },
			{ scale: 'blues', expected: 'D5-F5-G5-A♭5-A5-C6-D6' },
		];

		scaleTests.forEach(({ scale, expected }) => {
			changeSelection('Select Scale:', scale);
			expect(
				screen.getByText(`Selected Scale Notes: ${expected}`)
			).toBeInTheDocument();
		});
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

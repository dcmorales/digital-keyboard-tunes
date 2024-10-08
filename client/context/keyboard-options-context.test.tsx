import { render, screen, fireEvent } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { describe, it, expect, vi } from 'vitest';

import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from './keyboard-options-context';

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
				options={[
					'chromatic',
					'major',
					'natural minor',
					'harmonic minor',
					'melodic minor',
					'major pentatonic',
					'minor pentatonic',
					'blues',
				]}
				onChange={onScaleChange}
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
				<p>Selected scale notes: {selectedScaleNotes.join('-')}</p>
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

		expect(screen.getByText(/Selected key: C/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected octave: 4/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected waveform: sine/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected scale: chromatic/i)).toBeInTheDocument();
		expect(screen.getByText(/Active note: None/i)).toBeInTheDocument();
	});

	it('updates the selected key on change event', () => {
		renderWithProvider();

		changeSelection('Select key:', 'D');

		expect(screen.getByText(/Selected key: D/i)).toBeInTheDocument();
	});

	it('updates the selected octave on change event', () => {
		renderWithProvider();

		changeSelection('Select octave:', '5');

		expect(screen.getByText(/Selected octave: 5/i)).toBeInTheDocument();
	});

	it('updates the selected waveform on change event', () => {
		renderWithProvider();

		changeSelection('Select waveform:', 'square');

		expect(screen.getByText(/Selected waveform: square/i)).toBeInTheDocument();
	});

	it('updates the selected scale on change event', () => {
		renderWithProvider();

		changeSelection('Select scale:', 'major');

		expect(screen.getByText(/Selected scale: major/i)).toBeInTheDocument();
	});

	it('updates the active note when setActiveNote is called', () => {
		renderWithProvider();

		fireEvent.click(
			screen.getByRole('button', { name: /set active note to C4/i })
		);
		expect(screen.getByText(/Active Note: C4/i)).toBeInTheDocument();

		fireEvent.click(
			screen.getByRole('button', { name: /set active note to D4/i })
		);
		expect(screen.getByText(/Active Note: D4/i)).toBeInTheDocument();

		fireEvent.click(screen.getByText('Clear Active Note'));
		expect(screen.getByText(/Active Note: None/i)).toBeInTheDocument();
	});

	it('defines the correct set of selected notes based on octave and key', () => {
		renderWithProvider();

		changeSelection('Select key:', 'D');
		changeSelection('Select octave:', '5');

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
			changeSelection('Select scale:', scale);
			expect(
				screen.getByText(`Selected scale notes: ${expected}`)
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

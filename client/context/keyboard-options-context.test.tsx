import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ContextTestComponent from '@/mocks/context-test-component';
import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from './keyboard-options-context';

const renderWithProvider = () => {
	render(
		<KeyboardOptionsProvider>
			<ContextTestComponent />
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
		expect(screen.getByText(/Selected order: ascending/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected note-length: 1\/4/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected bpm: 100/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected total-notes: 13/i)).toBeInTheDocument();
		expect(screen.getByText(/Selected repeat-num: 0/i)).toBeInTheDocument();
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

	it('updates the selected order on change event', () => {
		renderWithProvider();

		changeSelection('Select order:', 'random');

		expect(screen.getByText(/Selected order: random/i)).toBeInTheDocument();
	});

	it('updates the selected note length on change event', () => {
		renderWithProvider();

		changeSelection('Select note-length:', '1/16');

		expect(
			screen.getByText(/Selected note-length: 1\/16/i)
		).toBeInTheDocument();
	});

	it('updates the selected bpm on change event', () => {
		renderWithProvider();

		changeSelection('Select bpm:', '110');

		expect(screen.getByText(/Selected bpm: 110/i)).toBeInTheDocument();
	});

	it('updates the selected note total on change event', () => {
		renderWithProvider();

		changeSelection('Select total-notes:', '10');

		expect(screen.getByText(/Selected total-notes: 10/i)).toBeInTheDocument();
	});

	it('updates the selected repeat number on change event', () => {
		renderWithProvider();

		changeSelection('Select repeat-num:', '2');

		expect(screen.getByText(/Selected repeat-num: 2/i)).toBeInTheDocument();
	});

	it('updates the active note state correctly', () => {
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

	it('updates isPlaying state correctly', () => {
		renderWithProvider();

		fireEvent.click(
			screen.getByRole('button', { name: /set isPlaying to true/i })
		);
		expect(screen.getByText(/Is playing: true/i)).toBeInTheDocument();

		fireEvent.click(
			screen.getByRole('button', { name: /set isPlaying to false/i })
		);
		expect(screen.getByText(/Is playing: false/i)).toBeInTheDocument();
	});

	it('defines the selected notes in the correct order based on octave, key, and scale', () => {
		renderWithProvider();

		changeSelection('Select key:', 'D');
		changeSelection('Select octave:', '5');
		changeSelection('Select scale:', 'major');

		expect(
			screen.getByText('Ordered scale notes: D5-E5-G♭5-G5-A5-B5-D♭6-D6')
		).toBeInTheDocument();

		changeSelection('Select order:', 'descending');

		expect(
			screen.getByText('Ordered scale notes: D6-D♭6-B5-A5-G5-G♭5-E5-D5')
		).toBeInTheDocument();
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

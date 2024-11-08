import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ContextTestComponent from '@/mocks/context-test-component';
import KeyboardSettings from '.';

describe('Keyboard settings', () => {
	beforeEach(() => {
		render(
			// ContextTestComponent makes easy state updates in tests possible
			<KeyboardOptionsProvider>
				<KeyboardSettings />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the keyboard settings group', () => {
		const keyboardSettings = screen.getByRole('group', {
			name: /Keyboard settings/i,
		});

		expect(keyboardSettings).toBeInTheDocument();
	});

	it('renders the key dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', { name: /Select a key/i });
		const tooltip = screen.getByRole('button', {
			name: /Information for Key setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('C');
		expect(dropdown).toHaveTextContent('D');
		expect(dropdown).toHaveTextContent('E');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the octave dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an octave/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Octave setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('2');
		expect(dropdown).toHaveTextContent('3');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the waveform dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a waveform/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Waveform setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('sine');
		expect(dropdown).toHaveTextContent('square');
		expect(dropdown).toHaveTextContent('triangle');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the scale dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a scale/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Scale setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('chromatic');
		expect(dropdown).toHaveTextContent('major');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the order dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an order/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Order setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('descending');
		expect(dropdown).toHaveTextContent('random');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the note length dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a note length/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Note Length setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1/8');
		expect(dropdown).toHaveTextContent('1/16');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the bpm dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a beats per minute value/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for BPM setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('110');
		expect(dropdown).toHaveTextContent('120');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the total notes dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a number of total notes/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Total Notes setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('5');
		expect(tooltip).toBeInTheDocument();
	});

	it('renders the repeat num dropdown options and tooltip', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select the number of times to repeat the scale/i,
		});
		const tooltip = screen.getByRole('button', {
			name: /Information for Repeat setting/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('5');
		expect(tooltip).toBeInTheDocument();
	});

	it('disables the dropdowns when isPlaying is true and enables otherwise', () => {
		const keyDropdown = screen.getByRole('combobox', { name: /Select a key/i });
		const scaleDropdown = screen.getByRole('combobox', {
			name: /Select a scale/i,
		});
		const bpmDropdown = screen.getByRole('combobox', {
			name: /Select a beats per minute value/i,
		});

		// change isPlaying to true using test component
		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to true/i })
		);
		expect(keyDropdown).toBeDisabled();
		expect(scaleDropdown).toBeDisabled();
		expect(bpmDropdown).toBeDisabled();

		// change isPlaying to false using test component
		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to false/i })
		);
		expect(keyDropdown).not.toBeDisabled();
		expect(scaleDropdown).not.toBeDisabled();
		expect(bpmDropdown).not.toBeDisabled();
	});
});

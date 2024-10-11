import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from '@/context/keyboard-options-context';
import KeyboardSettings from '.';

function MockIsPlayingButton({ value }: { value: boolean }): JSX.Element {
	const { setIsPlaying } = useKeyboardOptions();

	return (
		<button onClick={() => setIsPlaying(value)}>
			Set isPlaying to {value ? 'true' : 'false'}
		</button>
	);
}

describe('Keyboard settings', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSettings />
				<MockIsPlayingButton value={true} />
				<MockIsPlayingButton value={false} />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the keyboard settings group', () => {
		const keyboardSettings = screen.getByRole('group', {
			name: /Keyboard settings/i,
		});

		expect(keyboardSettings).toBeInTheDocument();
	});

	it('renders the key dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', { name: /Select a key/i });

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('C');
		expect(dropdown).toHaveTextContent('D');
		expect(dropdown).toHaveTextContent('E');
	});

	it('renders the octave dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an octave/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('2');
		expect(dropdown).toHaveTextContent('3');
	});

	it('renders the waveform dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a waveform/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('sine');
		expect(dropdown).toHaveTextContent('square');
		expect(dropdown).toHaveTextContent('triangle');
	});

	it('renders the scale dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a scale/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('chromatic');
		expect(dropdown).toHaveTextContent('major');
	});

	it('renders the order dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an order/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('descending');
		expect(dropdown).toHaveTextContent('random');
	});

	it('renders the note length dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a note length/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1/8');
		expect(dropdown).toHaveTextContent('1/16');
	});

	it('renders the bpm dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a beats per minute value/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('110');
		expect(dropdown).toHaveTextContent('120');
	});

	it('renders the total notes dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select a number of total notes/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('5');
	});

	it('renders the repeat num dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select the number of times to repeat the scale/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('5');
	});

	it('disables the dropdowns when isPlaying is true and enables otherwise', () => {
		const keyDropdown = screen.getByRole('combobox', { name: /Select a key/i });
		const scaleDropdown = screen.getByRole('combobox', {
			name: /Select a scale/i,
		});
		const bpmDropdown = screen.getByRole('combobox', {
			name: /Select a beats per minute value/i,
		});

		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to true/i })
		);
		expect(keyDropdown).toBeDisabled();
		expect(scaleDropdown).toBeDisabled();
		expect(bpmDropdown).toBeDisabled();

		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to false/i })
		);
		expect(keyDropdown).not.toBeDisabled();
		expect(scaleDropdown).not.toBeDisabled();
		expect(bpmDropdown).not.toBeDisabled();
	});
});

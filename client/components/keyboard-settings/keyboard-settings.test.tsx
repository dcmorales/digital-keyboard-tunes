import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardSettings from '.';

describe('Keyboard settings', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSettings />
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
});

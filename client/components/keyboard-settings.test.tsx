import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardSettings from './keyboard-settings';

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
			name: 'Keyboard settings',
		});

		expect(keyboardSettings).toBeInTheDocument();
	});

	it('renders the key dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', { name: 'Select a key' });

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('C');
		expect(dropdown).toHaveTextContent('D');
		expect(dropdown).toHaveTextContent('E');
	});

	it('renders the octave dropdown and options', () => {
		const dropdown = screen.getByRole('combobox', { name: 'Select an octave' });

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('1');
		expect(dropdown).toHaveTextContent('2');
		expect(dropdown).toHaveTextContent('3');
	});
});

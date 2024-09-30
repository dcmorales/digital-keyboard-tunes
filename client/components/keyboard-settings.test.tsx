import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
		expect(
			screen.getByRole('group', { name: 'Keyboard settings' })
		).toBeInTheDocument();
	});

	it('renders the settings dropdowns and the options', () => {
		const dropdown = screen.getByRole('combobox', { name: 'Select a key' });

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('C');
		expect(dropdown).toHaveTextContent('D');
		expect(dropdown).toHaveTextContent('E');
	});
});

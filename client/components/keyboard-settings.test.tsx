import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import KeyboardSettings from './keyboard-settings';

describe('Keyboard settings', () => {
	beforeEach(() => {
		render(<KeyboardSettings />);
	});

	it('renders the keyboard settings group', () => {
		expect(
			screen.getByRole('group', { name: 'Keyboard settings' })
		).toBeInTheDocument();
	});

	it('renders the settings dropdowns', () => {
		expect(
			screen.getByRole('combobox', { name: 'Select a key' })
		).toBeInTheDocument();
	});
});

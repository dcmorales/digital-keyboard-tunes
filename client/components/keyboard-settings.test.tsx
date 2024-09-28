import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import KeyboardSettings from './keyboard-settings';

describe('Header', () => {
	render(<KeyboardSettings />);

	it('renders the keyboard settings', () => {
		expect(
			screen.getByRole('group', { name: 'Keyboard settings' })
		).toBeDefined();
	});
});

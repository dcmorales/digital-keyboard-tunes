import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import KeyboardFull from './keyboard-full';

describe('Full Keyboard', () => {
	render(<KeyboardFull />);

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Full Keyboard Keys',
			})
		).toBeDefined();
	});

	it('renders 8 octaves', () => {
		expect(
			screen.getByRole('group', {
				name: 'Full Keyboard Keys',
			}).children.length
		).toBe(7);
	});
});

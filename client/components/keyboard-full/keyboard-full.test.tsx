import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KeyboardFull from './keyboard-full';

describe('Full Keyboard', () => {
	it('renders a labeled group div', () => {
		render(<KeyboardFull />);

		expect(
			screen.getByRole('group', {
				name: 'Full Keyboard Keys',
			})
		).toBeDefined();
	});
});

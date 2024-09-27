import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import KeyboardSelected from './keyboard-selected';

describe('Selected Keyboard', () => {
	render(<KeyboardSelected />);

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Selected keyboard',
			})
		).toBeDefined();
	});

	it('renders an octave with the correct selection of keys', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave for C3',
			})
		).toBeDefined();
	});
});

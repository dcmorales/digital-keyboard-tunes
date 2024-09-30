import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import KeyboardSelected from './keyboard-selected';

describe('Selected Keyboard', () => {
	beforeEach(() => {
		render(<KeyboardSelected />);
	});

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Selected keyboard',
			})
		).toBeInTheDocument();
	});

	it('renders an octave with the correct selection of keys', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave for C3',
			})
		).toBeInTheDocument();
	});
});

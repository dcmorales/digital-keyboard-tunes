import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import KeyboardFull from './keyboard-full';

describe('Full Keyboard', () => {
	beforeEach(() => {
		render(<KeyboardFull />);
	});

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Full keyboard keys',
			})
		).toBeInTheDocument();
	});

	it('renders 7 octaves', () => {
		expect(
			screen.getByRole('group', {
				name: 'Full keyboard keys',
			}).children.length
		).toBe(7);
	});

	it('renders a scrollbar', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: 'Scrollable area',
		});

		expect(scrollbar).toBeInTheDocument();
	});
});

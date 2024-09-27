import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Page from './page';

describe('Page', () => {
	render(<Page />);

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Digital Keyboard Tunes',
			})
		).toBeDefined();
	});

	it('renders the full keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Full keyboard keys',
		});
		expect(keyboardFull).toBeDefined();
	});

	it('renders the selected keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Selected keyboard',
		});
		expect(keyboardFull).toBeDefined();
	});
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Page from './page';

describe('Page', () => {
	beforeEach(() => {
		render(<Page />);
	});

	it('renders the header', () => {
		expect(screen.getByRole('banner')).toBeInTheDocument();
	});

	it('renders the full keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Full keyboard keys',
		});

		expect(keyboardFull).toBeInTheDocument();
	});

	it('renders the selected keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(keyboardFull).toBeInTheDocument();
	});
});

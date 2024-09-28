import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
	render(<Header />);

	it('renders the header', () => {
		expect(screen.getByRole('banner')).toBeDefined();
	});

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Digital Keyboard Tunes',
			})
		).toBeDefined();
	});

	it('renders the settings button', () => {
		expect(
			screen.getByRole('button', { name: 'Open keyboard settings' })
		).toBeDefined();
	});

	it('renders the keyboard settings', () => {
		expect(
			screen.getByRole('group', { name: 'Keyboard settings' })
		).toBeDefined();
	});
});

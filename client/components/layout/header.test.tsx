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

	it('renders the svg', () => {
		expect(screen.getByTestId('svg-gear')).toBeDefined();
	});
});

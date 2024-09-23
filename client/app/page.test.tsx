import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
	it('renders a heading', () => {
		render(<Page />);
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Digital Keyboard Tunes',
			})
		).toBeDefined();
	});
});

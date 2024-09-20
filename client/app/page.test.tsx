import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
	it('should render a heading', () => {
		render(<Page />);
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Digital Keyboard Tunes 1',
			})
		).toBeDefined();
	});
});

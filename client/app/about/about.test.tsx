import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import AboutPage from './page';

describe('About Page', () => {
	beforeEach(() => {
		render(<AboutPage />);
	});

	it('renders the sections', () => {
		const firstHeading = screen.getByRole('heading', {
			level: 2,
			name: /What is it/i,
		});
		const firstSection = firstHeading.closest('section');

		const secondHeading = screen.getByRole('heading', {
			level: 2,
			name: /Settings/i,
		});
		const secondSection = secondHeading.closest('section');

		const thirdHeading = screen.getByRole('heading', {
			level: 2,
			name: /Audio controls/i,
		});
		const thirdSection = thirdHeading.closest('section');

		expect(firstSection).toBeInTheDocument();
		expect(secondSection).toBeInTheDocument();
		expect(thirdSection).toBeInTheDocument();
	});
});

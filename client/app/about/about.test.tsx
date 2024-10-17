import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import AboutPage from './page';

describe('Notes Display', () => {
	beforeEach(() => {
		render(<AboutPage />);
	});

	it('renders the headings', () => {
		const firstHeading = screen.getByRole('heading', {
			level: 2,
			name: /What is it/i,
		});
		const secondHeading = screen.getByRole('heading', {
			level: 2,
			name: /Settings/i,
		});
		const thirdHeading = screen.getByRole('heading', {
			level: 2,
			name: /Audio controls/i,
		});

		expect(firstHeading).toBeInTheDocument();
		expect(secondHeading).toBeInTheDocument();
		expect(thirdHeading).toBeInTheDocument();
	});
});

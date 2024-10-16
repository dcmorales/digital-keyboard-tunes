import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Footer from '.';

describe('Footer', () => {
	beforeEach(() => {
		render(<Footer />);
	});

	it('renders the footer', () => {
		const footer = screen.getByRole('contentinfo');

		expect(footer).toBeInTheDocument();
	});
});

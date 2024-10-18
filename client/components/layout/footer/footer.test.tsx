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

	it('contains a link to the GitHub repository', () => {
		const link = screen.getByRole('link', { name: /Github Repository/i });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(link).toHaveAttribute(
			'href',
			'https://github.com/dcmorales/digital-keyboard-tunes'
		);
	});
});

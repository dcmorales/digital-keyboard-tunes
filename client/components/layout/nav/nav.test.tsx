import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Nav from '.';

describe('Nav', () => {
	it('renders the nav when closed', () => {
		render(<Nav isOpen={false} />);
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.className.includes('closed')).toBe(true);
	});

	it('renders the nav when open', () => {
		render(<Nav isOpen={true} />);
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.className.includes('open')).toBe(true);
	});

	it('renders navigation links', () => {
		render(<Nav isOpen={true} />);
		const aboutLink = screen.getByRole('link', { name: /about/i });
		const githubLink = screen.getByRole('link', { name: /github repository/i });

		expect(aboutLink).toBeInTheDocument();
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('target', '_blank');
		expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/dcmorales/digital-keyboard-tunes'
		);
	});
});

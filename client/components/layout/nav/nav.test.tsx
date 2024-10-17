import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Nav from '.';

describe('Nav', () => {
	it('renders the nav when closed', () => {
		render(<Nav isOpen={false} setShowMenu={vi.fn()} />);
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.className.includes('closed')).toBe(true);
	});

	it('renders the nav when open', () => {
		render(<Nav isOpen={true} setShowMenu={vi.fn()} />);
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.className.includes('open')).toBe(true);
	});

	it('renders the close menu button and closes when clicked', () => {
		const setShowMenu = vi.fn();
		render(<Nav isOpen={true} setShowMenu={setShowMenu} />);

		const button = screen.getByRole('button', {
			name: /Close menu/i,
		});

		expect(button).toBeInTheDocument();

		fireEvent.click(button);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});

	it('renders navigation links', () => {
		render(<Nav isOpen={true} setShowMenu={vi.fn()} />);
		const homeLink = screen.getByRole('link', { name: /home/i });
		const aboutLink = screen.getByRole('link', { name: /about/i });
		const githubLink = screen.getByRole('link', { name: /github repository/i });

		expect(homeLink).toBeInTheDocument();
		expect(aboutLink).toBeInTheDocument();
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('target', '_blank');
		expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/dcmorales/digital-keyboard-tunes'
		);
	});

	it('closes the nav when internal links are clicked', () => {
		const setShowMenu = vi.fn();
		render(<Nav isOpen={true} setShowMenu={setShowMenu} />);

		const homeLink = screen.getByRole('link', { name: /home/i });

		fireEvent.click(homeLink);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});

	it('closes the nav when overlay is clicked', () => {
		const setShowMenu = vi.fn();
		render(<Nav isOpen={true} setShowMenu={setShowMenu} />);
		const overlay = screen.getByRole('presentation');

		fireEvent.click(overlay);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});
});

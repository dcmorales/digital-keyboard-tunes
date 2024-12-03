import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Nav from '.';

describe('Nav', () => {
	beforeEach(() => {
		// add `menu-root` to the document body
		const menuRoot = document.createElement('div');
		menuRoot.id = 'menu-root';
		document.body.appendChild(menuRoot);
	});

	afterEach(() => {
		const menuRoot = document.getElementById('menu-root');
		if (menuRoot) {
			menuRoot.remove();
		}
	});

	const renderNav = (isOpen: boolean, setShowMenu = vi.fn()) => {
		render(<Nav isOpen={isOpen} setShowMenu={setShowMenu} />);

		return { setShowMenu };
	};

	it('does not render the nav when closed', () => {
		renderNav(false);
		const nav = screen.queryByRole('navigation');

		expect(nav).not.toBeInTheDocument(); // initially hidden
	});

	it('renders the nav when open', () => {
		renderNav(true);
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav).toHaveAttribute('aria-hidden', 'false');
		expect(nav.className.includes('open')).toBe(true);
	});

	it('renders the close menu button and closes the menu when the button is clicked', () => {
		const { setShowMenu } = renderNav(true);
		const button = screen.getByRole('button', { name: /Close menu/i });

		expect(button).toBeInTheDocument();

		fireEvent.click(button);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});

	it('renders navigation links', () => {
		renderNav(true);
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
		const { setShowMenu } = renderNav(true);
		const homeLink = screen.getByRole('link', { name: /home/i });

		fireEvent.click(homeLink);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});

	it('closes the nav when overlay is clicked', () => {
		const { setShowMenu } = renderNav(true);
		const overlay = screen.getByRole('presentation');

		fireEvent.click(overlay);
		expect(setShowMenu).toHaveBeenCalledWith(false);
	});
});

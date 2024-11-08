import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import Header from '.';

vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
}));

describe('Header', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Header />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the header', () => {
		const header = screen.getByRole('banner');

		expect(header).toBeInTheDocument();
	});

	it('renders a heading', () => {
		const heading = screen.getByRole('heading', {
			level: 1,
			name: 'Digital Keyboard Tunes',
		});

		expect(heading).toBeInTheDocument();
	});

	it('renders the settings button initially', () => {
		const button = screen.getByRole('button', {
			name: /Open keyboard settings/i,
		});

		expect(button).toBeInTheDocument();
	});

	it('toggles the settings after clicking settings button', () => {
		const button = screen.getByRole('button', {
			name: /Open keyboard settings/i,
		});

		fireEvent.click(button);

		const keyboardSettings = screen.getByRole('group', {
			name: /Keyboard settings/i,
		});

		expect(keyboardSettings).toBeInTheDocument();
		expect(button).toHaveAttribute('aria-label', 'Close keyboard settings');

		fireEvent.click(button);
		expect(keyboardSettings).not.toBeInTheDocument();
		expect(button).toHaveAttribute('aria-label', 'Open keyboard settings');
	});

	it('renders the menu button', () => {
		const button = screen.getByRole('button', {
			name: /Open menu/i,
		});

		expect(button).toBeInTheDocument();
	});

	it('removes settings after clicking menu button', () => {
		const menuButton = screen.getByRole('button', {
			name: /Open menu/i,
		});
		const settingsButton = screen.getByRole('button', {
			name: /Open keyboard settings/i,
		});

		fireEvent.click(settingsButton);
		const keyboardSettings = screen.getByRole('group', {
			name: /Keyboard settings/i,
		});

		fireEvent.click(menuButton);

		expect(keyboardSettings).not.toBeInTheDocument();
	});

	it('does not render the settings button if on the about page', () => {
		cleanup();
		const { rerender } = render(
			<KeyboardOptionsProvider>
				<Header />
			</KeyboardOptionsProvider>
		);

		const mockedUsePathname = usePathname as unknown as ReturnType<
			typeof vi.fn
		>;
		mockedUsePathname.mockReturnValue('/about');

		rerender(
			<KeyboardOptionsProvider>
				<Header />
			</KeyboardOptionsProvider>
		);

		const settingsButton = screen.queryByRole('button', {
			name: /Open keyboard settings/i,
		});

		expect(settingsButton).not.toBeInTheDocument();
	});

	it('renders the nav after clicking menu button', () => {
		const button = screen.getByRole('button', {
			name: /Open menu/i,
		});
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
		expect(nav.className.includes('closed')).toBe(true);

		fireEvent.click(button);

		expect(nav.className.includes('open')).toBe(true);
	});
});

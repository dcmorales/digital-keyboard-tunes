import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import Header from './header';

describe('Header', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Header />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the header', () => {
		expect(screen.getByRole('banner')).toBeInTheDocument();
	});

	it('renders a heading', () => {
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Digital Keyboard Tunes',
			})
		).toBeInTheDocument();
	});

	it('renders the settings button', () => {
		expect(
			screen.getByRole('button', { name: 'Open keyboard settings' })
		).toBeInTheDocument();
	});

	it('toggles the settings after clicking settings button', () => {
		const button = screen.getByRole('button', {
			name: 'Open keyboard settings',
		});

		fireEvent.click(button);

		expect(
			screen.getByRole('group', { name: 'Keyboard settings' })
		).toBeInTheDocument();
		expect(button).toHaveAttribute('aria-label', 'Close keyboard settings');
	});
});

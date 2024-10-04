import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import Header from '.';

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

	it('renders the settings button', () => {
		const button = screen.getByRole('button', {
			name: 'Open keyboard settings',
		});

		expect(button).toBeInTheDocument();
	});

	it('toggles the settings after clicking settings button', () => {
		const button = screen.getByRole('button', {
			name: 'Open keyboard settings',
		});

		fireEvent.click(button);

		const keyboardSettings = screen.getByRole('group', {
			name: 'Keyboard settings',
		});

		expect(keyboardSettings).toBeInTheDocument();
		expect(button).toHaveAttribute('aria-label', 'Close keyboard settings');
	});
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import Page from './page';

describe('Home Page', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Page />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the full keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: /Full keyboard keys/i,
		});

		expect(keyboardFull).toBeInTheDocument();
	});

	it('renders the selected keyboard', () => {
		const keyboardSelected = screen.getByRole('region', {
			name: /Selected Keyboard: audio controls and keys/i,
		});

		expect(keyboardSelected).toBeInTheDocument();
	});
});

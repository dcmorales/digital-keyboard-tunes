import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardFull from './keyboard-full';

describe('Full Keyboard', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardFull />
			</KeyboardOptionsProvider>
		);
	});

	it('renders a labeled group div', () => {
		const fullKeyboard = screen.getByRole('group', {
			name: 'Full keyboard keys',
		});

		expect(fullKeyboard).toBeInTheDocument();
	});

	it('renders 7 octaves', () => {
		const fullKeyboard = screen.getByRole('group', {
			name: 'Full keyboard keys',
		});

		expect(fullKeyboard.children.length).toBe(7);
	});

	it('renders a scrollbar', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: 'Scrollable area',
		});

		expect(scrollbar).toBeInTheDocument();
	});
});

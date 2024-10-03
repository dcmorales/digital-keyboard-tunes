import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import Page from './page';

describe('Page', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Page />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the header', () => {
		const header = screen.getByRole('banner');

		expect(header).toBeInTheDocument();
	});

	it('renders the full keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Full keyboard keys',
		});

		expect(keyboardFull).toBeInTheDocument();
	});

	it('renders the selected keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(keyboardFull).toBeInTheDocument();
	});

	it('renders a labeled group div', () => {
		const audioControls = screen.getByRole('group', {
			name: 'Audio controls',
		});

		expect(audioControls).toBeInTheDocument();
	});
});

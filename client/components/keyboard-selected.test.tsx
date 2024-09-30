import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardSelected from './keyboard-selected';

describe('Selected Keyboard', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSelected />
			</KeyboardOptionsProvider>
		);
	});

	it('renders a labeled group div', () => {
		const selectedKeyboard = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(selectedKeyboard).toBeInTheDocument();
	});

	it('renders an octave with the correct selection of keys', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C3',
		});

		expect(octave).toBeInTheDocument();
	});
});

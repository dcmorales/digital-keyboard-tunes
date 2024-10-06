import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardSelected from '.';

describe('Selected Keyboard', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSelected />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the selected keyboard', () => {
		const keyboardSelected = screen.getByRole('region', {
			name: /Selected Keyboard: audio controls and keys/i,
		});

		expect(keyboardSelected).toBeInTheDocument();
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: /Audio controls/i,
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the default octave with the correct selection of keys', () => {
		const octave = screen.getByRole('group', {
			name: /Octave for C4/i,
		});

		expect(octave).toBeInTheDocument();
	});
});

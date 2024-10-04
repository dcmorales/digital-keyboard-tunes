import { render, screen, within } from '@testing-library/react';
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

	it('renders the selected keyboard', () => {
		const keyboardSelected = screen.getByRole('region', {
			name: 'Selected Keyboard: audio controls and keys',
		});

		expect(keyboardSelected).toBeInTheDocument();
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: 'Audio controls',
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('rearranges the 13 notes correctly', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C4',
		});

		const noteButtons = within(octave).getAllByRole('button');
		const noteTexts = noteButtons.map((button) =>
			// remove whitespace
			button.textContent?.trim().replace(/\s+/g, '')
		);

		expect(noteTexts).toEqual([
			'C4',
			'D♭4',
			'D4',
			'E♭4',
			'E4',
			'F4',
			'G♭4',
			'G4',
			'A♭4',
			'A4',
			'B♭4',
			'B4',
			'C5',
		]);
	});

	it('renders the default octave with the correct selection of keys', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C4',
		});

		expect(octave).toBeInTheDocument();
	});
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import KeyboardSelected from './keyboard-selected';

const mockFullNoteOptions: FullNote[] = [
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
];

describe('Selected Keyboard', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSelected fullNotes={mockFullNoteOptions} />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the selected keyboard div', () => {
		const selectedKeyboard = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(selectedKeyboard).toBeInTheDocument();
	});

	it('renders the default octave with the correct selection of keys', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C4',
		});

		expect(octave).toBeInTheDocument();
	});
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import Octave from './octave';

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

describe('Octave', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Octave fullNotes={mockFullNoteOptions} />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the octave div', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C4',
		});

		expect(octave).toBeInTheDocument();
	});

	it('renders each note as a child', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C4',
		});

		expect(octave.children.length).toBe(12);
	});
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import { FullNote } from '@/types/keyboard-option-types';
import Octave from './octave';

const mockFullNoteOptions: FullNote[] = [
	'C3',
	'D♭3',
	'D3',
	'E♭3',
	'E3',
	'F3',
	'G♭3',
	'G3',
	'A♭3',
	'A3',
	'B♭3',
	'B3',
];

describe('Octave', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Octave fullNotes={mockFullNoteOptions} />
			</KeyboardOptionsProvider>
		);
	});

	it('renders a labeled group div', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C3',
		});

		expect(octave).toBeInTheDocument();
	});

	it('renders each note as a child', () => {
		const octave = screen.getByRole('group', {
			name: 'Octave for C3',
		});

		expect(octave.children.length).toBe(12);
	});
});

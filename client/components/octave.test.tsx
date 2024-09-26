import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Octave from './octave';

const mockNoteOptions = [
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
	render(<Octave fullNotes={mockNoteOptions} />);

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave for C3',
			})
		).toBeDefined();
	});

	it('renders 12 keys', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave for C3',
			}).children.length
		).toBe(12);
	});
});

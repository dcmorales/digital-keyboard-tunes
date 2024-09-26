import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Octave from './octave';

describe('Octave', () => {
	render(<Octave octaveNum={1} />);

	it('renders a labeled group div', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave #1',
			})
		).toBeDefined();
	});

	it('renders 12 keys', () => {
		expect(
			screen.getByRole('group', {
				name: 'Octave #1',
			}).children.length
		).toBe(12);
	});
});

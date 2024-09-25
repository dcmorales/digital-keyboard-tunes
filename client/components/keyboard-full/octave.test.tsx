import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Octave from './octave';

describe('Octave', () => {
	it('renders a labeled group div', () => {
		render(<Octave octNum={1} />);

		expect(
			screen.getByRole('group', {
				name: 'Octave #1',
			})
		).toBeDefined();
	});
});

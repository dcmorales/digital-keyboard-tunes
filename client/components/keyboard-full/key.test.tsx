import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Key from './key';

describe('Key', () => {
	it('renders a button the correct aria label', () => {
		render(<Key note="C1" />);

		expect(
			screen.getByRole('button', {
				name: 'Play the C1 note',
			})
		).toBeDefined();
	});
});

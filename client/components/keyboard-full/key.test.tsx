import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Key from './key';

describe('Key', () => {
	it('renders a button the correct aria label', () => {
		render(<Key note="C" />);

		expect(
			screen.getByRole('button', {
				name: 'Play C note',
			})
		).toBeDefined();
	});
});

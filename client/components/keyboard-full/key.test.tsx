import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Key from './key';

describe('Key', () => {
	beforeEach(() => {
		render(<Key note="C1" />);
	});

	afterEach(cleanup);

	it('renders a button the correct aria label', () => {
		expect(
			screen.getByRole('button', {
				name: 'Play the C1 note',
			})
		).toBeDefined();
	});

	it('applies the correct class name', () => {
		expect(screen.getByRole('button').classList.contains('key__white')).toBe(
			true
		);
	});
});

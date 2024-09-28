import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Button from './button';

describe('Header', () => {
	const { getByText } = render(
		<Button ariaLabel="Test the Button">Test Button</Button>
	);

	it('renders the button with children', () => {
		expect(
			screen.getByRole('button', { name: 'Test the Button' })
		).toBeDefined();
		expect(getByText('Test Button')).toBeDefined();
	});
});

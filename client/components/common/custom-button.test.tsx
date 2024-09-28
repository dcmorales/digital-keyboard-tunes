import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import CustomButton from './custom-button';

describe('Header', () => {
	const { getByText } = render(
		<CustomButton ariaLabel="Test the Button">Test Button</CustomButton>
	);

	it('renders the button with children', () => {
		expect(
			screen.getByRole('button', { name: 'Test the Button' })
		).toBeDefined();
		expect(getByText('Test Button')).toBeDefined();
	});
});

import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomButton from './custom-button';

describe('Header', () => {
	const handleClick = vi.fn();
	const { getByText } = render(
		<CustomButton ariaLabel="Test the Button" onClick={handleClick}>
			Test Button
		</CustomButton>
	);

	it('renders the button with children', () => {
		expect(
			screen.getByRole('button', { name: 'Test the Button' })
		).toBeDefined();
		expect(getByText('Test Button')).toBeDefined();
	});

	it('calls onClick when clicked', () => {
		const button = screen.getByRole('button', { name: 'Test the Button' });

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});

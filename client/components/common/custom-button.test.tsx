import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CustomButton from './custom-button';

describe('Custom Button', () => {
	let handleClick: () => void;

	beforeEach(() => {
		handleClick = vi.fn();
		render(
			<CustomButton ariaLabel="Test the Button" onClick={handleClick}>
				Test Button
			</CustomButton>
		);
	});

	it('renders the button with children', () => {
		expect(
			screen.getByRole('button', { name: 'Test the Button' })
		).toBeInTheDocument();
		expect(screen.getByText('Test Button')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const button = screen.getByRole('button', { name: 'Test the Button' });

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});

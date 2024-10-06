import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CustomButton from '.';

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
		const button = screen.getByRole('button', { name: /Test the Button/i });

		expect(button).toBeInTheDocument();
		expect(screen.getByText('Test Button')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const button = screen.getByRole('button', { name: /Test the Button/i });

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});

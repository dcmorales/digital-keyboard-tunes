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

	it('applies the custom className if provided', () => {
		render(
			<CustomButton
				ariaLabel="Test ClassName"
				onClick={handleClick}
				className="custom-class"
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', { name: /Test ClassName/i });

		expect(button).toHaveClass('custom-class');
	});

	it('renders the button as disabled when the disabled prop is true', () => {
		render(
			<CustomButton
				ariaLabel="Test disabled Button"
				onClick={handleClick}
				disabled
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', {
			name: /Test disabled Button/i,
		});

		expect(button).toBeInTheDocument();
		expect(button).toBeDisabled();

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(0);
	});

	it('calls onClick when clicked', () => {
		const button = screen.getByRole('button', { name: /Test the Button/i });

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('calls onFocus when focused', () => {
		const handleFocus = vi.fn();
		render(
			<CustomButton
				ariaLabel="Test Focus"
				onClick={handleClick}
				onFocus={handleFocus}
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', { name: /Test Focus/i });

		button.focus();

		expect(handleFocus).toHaveBeenCalledTimes(1);
	});

	it('calls onBlur when blurred', () => {
		const handleBlur = vi.fn();
		render(
			<CustomButton
				ariaLabel="Test Blur"
				onClick={handleClick}
				onBlur={handleBlur}
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', { name: /Test Blur/i });

		button.focus();
		button.blur();

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it('calls onKeyDown when a key is pressed', () => {
		const handleKeyDown = vi.fn();
		render(
			<CustomButton
				ariaLabel="Test KeyDown"
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', { name: /Test KeyDown/i });

		fireEvent.keyDown(button, { key: 'Enter' });

		expect(handleKeyDown).toHaveBeenCalledTimes(1);
		expect(handleKeyDown).toHaveBeenCalledWith(
			expect.objectContaining({ key: 'Enter' })
		);
	});

	it('calls onTouchStart when a touch event starts', () => {
		const handleTouchStart = vi.fn();
		render(
			<CustomButton
				ariaLabel="Test TouchStart"
				onClick={handleClick}
				onTouchStart={handleTouchStart}
			>
				Test Button
			</CustomButton>
		);

		const button = screen.getByRole('button', { name: /Test TouchStart/i });

		fireEvent.touchStart(button);

		expect(handleTouchStart).toHaveBeenCalledTimes(1);
	});
});

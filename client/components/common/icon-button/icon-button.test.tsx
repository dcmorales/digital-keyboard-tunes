import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import IconButton from '.';

describe('Icon Button', () => {
	let handleClick: () => void;

	beforeEach(() => {
		handleClick = vi.fn();
		render(
			<IconButton icon="gear" ariaLabel="Icon button" onClick={handleClick} />
		);
	});

	it('renders the icon button with the tooltip container', () => {
		const button = screen.getByRole('button', { name: /Icon button/i });
		const tooltipContainer = button.closest(
			'[aria-describedby="tooltip"]'
		) as HTMLElement;

		expect(button).toBeInTheDocument();
		expect(tooltipContainer).toBeInTheDocument();
	});

	it('shows the tooltip with aria label text if no tooltip text is provided', () => {
		const button = screen.getByRole('button', { name: /Icon button/i });

		fireEvent.mouseEnter(button);

		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent('Icon button'); // same as ariaLabel
	});

	it('shows the tooltip with custom tooltip text if provided', () => {
		render(
			<IconButton
				icon="gear"
				ariaLabel="Button with custom tooltip"
				tooltipText="Custom tooltip text"
				onClick={handleClick}
			/>
		);
		const button = screen.getByRole('button', {
			name: /Button with custom tooltip/i,
		});

		fireEvent.mouseEnter(button);

		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).toHaveTextContent('Custom tooltip text');
	});

	it('renders a large icon if no size is provided', () => {
		const gearIcon = screen.getByTestId('svg-gear');
		const includesLargeClass =
			gearIcon.parentElement &&
			gearIcon.parentElement.className.includes('large');

		expect(includesLargeClass).toBe(true);
	});

	it('renders an icon with the specified size if provided', () => {
		render(
			<IconButton
				icon="info"
				iconSize="small"
				ariaLabel="Button with custom tooltip"
				onClick={handleClick}
			/>
		);
		const infoIcon = screen.getByTestId('svg-info');
		const includesSmallClass =
			infoIcon.parentElement &&
			infoIcon.parentElement.className.includes('small');

		expect(includesSmallClass).toBe(true);
	});

	it('calls onClick when clicked', () => {
		const button = screen.getByRole('button', { name: /Icon button/i });

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});

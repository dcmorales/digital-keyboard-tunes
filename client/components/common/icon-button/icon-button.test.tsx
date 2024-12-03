import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import IconButton from '.';

describe('Icon Button', () => {
	let handleClick: () => void;

	beforeEach(() => {
		handleClick = vi.fn();
		render(
			<IconButton
				icon="gear"
				ariaLabel="Icon button"
				hasTooltip
				tooltipPosition="top"
				tooltipWidth={10}
				onClick={handleClick}
			/>
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

		// cannot get by role since aria-hidden is true
		const tooltip = screen.getByText('Icon button');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent('Icon button'); // same as ariaLabel
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

	it('passes the correct props to Tooltip', () => {
		const button = screen.getByRole('button', { name: /Icon button/i });

		fireEvent.mouseEnter(button);

		// cannot get by role since aria-hidden is true
		const tooltip = screen.getByText('Icon button');

		expect(tooltip).toHaveStyle('width: 10rem');
		expect(tooltip.className.includes('top')).toBe(true);
	});

	it('does not render a tooltip if hasTooltip is not passed in', () => {
		render(
			<IconButton
				icon="gear"
				ariaLabel="Button without tooltip"
				onClick={handleClick}
			/>
		);
		const button = screen.getByRole('button', {
			name: /Button without tooltip/i,
		});

		fireEvent.mouseEnter(button);

		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).not.toBeInTheDocument();
	});
});

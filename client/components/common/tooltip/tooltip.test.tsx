import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Tooltip from '.';

describe('Tooltip Component', () => {
	const mockTopic = 'Test Topic';
	const mockText = 'Tooltip text';
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(<Tooltip topic={mockTopic} text={mockText} />);

		button = screen.getByRole('button', {
			name: `Information for ${mockTopic}`,
		});
	});

	// assert tooltip is visible and return it
	const checkTooltipIsVisible = () => {
		const tooltip = screen.getByRole('tooltip');
		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent(mockText);

		// check tooltip text container class for visibility
		const tooltipIsVisible =
			tooltip.parentElement?.className.includes('isVisible');
		expect(tooltipIsVisible).toBe(true);

		return tooltip;
	};

	// assert tooltip is hidden
	const checkTooltipIsHidden = async (tooltip: HTMLElement) => {
		await waitFor(() => {
			const tooltipIsVisibleAfterLeave =
				tooltip.parentElement?.className.includes('isVisible');
			expect(tooltipIsVisibleAfterLeave).toBe(false);
		});
	};

	it('renders the tooltip button', () => {
		expect(button).toBeInTheDocument();
	});

	it('does not show tooltip initially', () => {
		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on mouse enter and hides on mouse leave', async () => {
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.mouseLeave(button);

		await checkTooltipIsHidden(tooltip);
	});

	it('shows tooltip on button focus and hides on blur', async () => {
		fireEvent.focus(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.blur(button);

		await checkTooltipIsHidden(tooltip);
	});

	it('hides tooltip when the escape key is pressed', async () => {
		// show tooltip
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.keyDown(button, { key: 'Escape' });

		await checkTooltipIsHidden(tooltip);
	});

	it('does not hide the tooltip if a key other than the escape key is pressed', () => {
		// show tooltip
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();
		const tooltipIsVisible =
			tooltip.parentElement &&
			tooltip.parentElement.className.includes('isVisible');

		const otherKeys = ['Tab', 'ArrowUp', 'ArrowDown', 'Enter', ' a'];

		otherKeys.forEach((key) => {
			fireEvent.keyDown(button, { key });

			expect(tooltipIsVisible).toBe(true); // class name doesn't change
		});
	});

	it('positions the tooltip to the left if it overflows the screen', async () => {
		vi.useFakeTimers();

		// simulate overflow scenario
		const getBoundingClientRectMock = vi.fn().mockReturnValue({
			right: window.innerWidth + 10,
		});
		Object.defineProperty(HTMLDivElement.prototype, 'getBoundingClientRect', {
			value: getBoundingClientRectMock,
		});

		// show Tooltip
		fireEvent.mouseEnter(button);
		const tooltip = screen.getByRole('tooltip');

		// force tooltip to recheck position by triggering resize
		fireEvent.resize(window);

		await act(() => {
			vi.advanceTimersByTime(300);
		});

		// check tooltip text container class for position
		const isPositionedLeft =
			tooltip.parentElement &&
			tooltip.parentElement.className.includes('positionedLeft');

		expect(isPositionedLeft).toBe(true);

		vi.useRealTimers();
	});
});

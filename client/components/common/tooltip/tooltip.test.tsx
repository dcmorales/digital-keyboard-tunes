import { fireEvent, render, screen } from '@testing-library/react';
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

		const tooltipIsVisible =
			tooltip.parentElement &&
			tooltip.parentElement.className.includes('isVisible');
		expect(tooltip).toHaveAttribute('aria-hidden', 'false');
		expect(tooltipIsVisible).toBe(true);

		return tooltip;
	};

	// assert tooltip is hidden
	const checkTooltipIsHidden = (tooltip: HTMLElement) => {
		const tooltipIsVisible =
			tooltip.parentElement &&
			tooltip.parentElement.className.includes('isVisible');

		expect(tooltip).toHaveAttribute('aria-hidden', 'true');
		expect(tooltipIsVisible).toBe(false);
	};

	it('renders the default tooltip button', () => {
		expect(button).toBeInTheDocument();
	});

	it('does not show tooltip initially', () => {
		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on mouse enter and hides on mouse leave', () => {
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.mouseLeave(button);

		checkTooltipIsHidden(tooltip);
	});

	it('shows tooltip on button focus and hides on blur', () => {
		fireEvent.focus(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.blur(button);

		checkTooltipIsHidden(tooltip);
	});

	it('hides tooltip when the escape key is pressed', () => {
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		fireEvent.keyDown(button, { key: 'Escape' });

		checkTooltipIsHidden(tooltip);
	});

	it('does not hide the tooltip if a key other than the escape key is pressed', () => {
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

	it('displays in the default position if no value is provided', () => {
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		expect(tooltip.className.includes('bottom')).toBe(true);
	});

	it('displays in the provided position', () => {
		render(<Tooltip topic="Position" text={mockText} position="top" />);
		button = screen.getByRole('button', {
			name: /Information for position/i,
		});

		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		expect(tooltip.className.includes('top')).toBe(true);
	});

	it('displays with the default width if no value is provided', () => {
		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		expect(tooltip).toHaveStyle('width: 7.5rem');
	});

	it('displays with the custom width', () => {
		render(<Tooltip topic="Width" text={mockText} widthInRem={10} />);
		button = screen.getByRole('button', {
			name: /Information for width/i,
		});

		fireEvent.mouseEnter(button);

		const tooltip = checkTooltipIsVisible();

		expect(tooltip).toHaveStyle('width: 10rem');
	});

	it('dismisses at the default time for touch events if enabled and no value is provided', async () => {
		vi.useFakeTimers();
		render(
			<Tooltip topic="Default auto-dismiss" text={mockText} autoDismiss />
		);
		button = screen.getByRole('button', {
			name: /Information for default auto-dismiss/i,
		});

		fireEvent.touchStart(button);

		const tooltip = checkTooltipIsVisible();

		await act(() => {
			vi.advanceTimersByTime(5000);
		});

		checkTooltipIsHidden(tooltip);

		vi.useRealTimers();
	});

	it('dismisses at the custom time for touch events if enabled', async () => {
		vi.useFakeTimers();
		render(
			<Tooltip
				topic="Custom auto-dismiss"
				text={mockText}
				autoDismiss
				secondsDisplayed={3}
			/>
		);
		button = screen.getByRole('button', {
			name: /Information for custom auto-dismiss/i,
		});

		fireEvent.touchStart(button);

		const tooltip = checkTooltipIsVisible();

		await act(() => {
			vi.advanceTimersByTime(3000);
		});

		checkTooltipIsHidden(tooltip);

		vi.useRealTimers();
	});

	it('renders a valid child element as the trigger element', async () => {
		render(
			<Tooltip text={mockText}>
				<button aria-label="custom trigger element">Custom button</button>
			</Tooltip>
		);
		const customButton = screen.getByRole('button', {
			name: /custom trigger element/i,
		});

		expect(customButton).toBeInTheDocument();

		// mouse events
		fireEvent.mouseEnter(customButton);
		const mouseEventTooltip = checkTooltipIsVisible();
		fireEvent.mouseLeave(customButton);
		checkTooltipIsHidden(mouseEventTooltip);

		// focus and blue events
		fireEvent.focus(customButton);
		const focusEventTooltip = checkTooltipIsVisible();
		fireEvent.blur(customButton);
		checkTooltipIsHidden(focusEventTooltip);

		// key down event
		fireEvent.mouseEnter(customButton);
		const keyDownEventTooltip = checkTooltipIsVisible();
		fireEvent.keyDown(customButton, { key: 'Escape' });
		checkTooltipIsHidden(keyDownEventTooltip);

		// touch event
		fireEvent.touchStart(customButton);
		const touchEventTooltip = checkTooltipIsVisible();
		fireEvent.blur(customButton);
		checkTooltipIsHidden(touchEventTooltip);
	});

	it('does not add handlers to invalid children', () => {
		const invalidChildren = 'Not a valid React element';
		// @ts-expect-error | Testing for invalid child
		render(<Tooltip text={mockText}>{invalidChildren}</Tooltip>);

		const tooltipContainer = screen.getByText(invalidChildren).parentElement;
		expect(tooltipContainer).toBeInTheDocument();

		if (tooltipContainer) {
			fireEvent.mouseEnter(tooltipContainer);
			fireEvent.focus(tooltipContainer);
			fireEvent.touchStart(tooltipContainer);
		}

		const tooltip = screen.queryByRole('tooltip');
		expect(tooltip).not.toBeInTheDocument();
	});

	it('clears the timeout when hiding the tooltip', () => {
		const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

		render(<Tooltip topic="Clear Timeout" text={mockText} autoDismiss />);
		button = screen.getByRole('button', {
			name: /Information for clear timeout/i,
		});

		// set the timeout
		fireEvent.touchStart(button);
		const tooltip = checkTooltipIsVisible();

		// call hideTooltip explicitly
		fireEvent.blur(button);
		checkTooltipIsHidden(tooltip);

		// verify that the timeout was cleared
		expect(clearTimeoutSpy).toHaveBeenCalled();

		clearTimeoutSpy.mockRestore();
	});

	it('is not present in accessibility tree when ariaHidden prop is true', () => {
		render(
			<Tooltip text="Not in accessibility tree" ariaHidden>
				<button aria-label="Aria hidden example">Aria hidden button</button>
			</Tooltip>
		);
		const ariaHiddenButton = screen.getByRole('button', {
			name: /Aria hidden example/i,
		});

		fireEvent.mouseEnter(ariaHiddenButton);

		// accessible role is hidden
		let tooltip = screen.queryByRole('tooltip');
		expect(tooltip).not.toBeInTheDocument();

		tooltip = screen.getByText('Not in accessibility tree');
		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveAttribute('aria-hidden', 'true');
	});
});

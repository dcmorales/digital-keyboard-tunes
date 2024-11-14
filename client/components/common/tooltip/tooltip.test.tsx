import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';

import Tooltip from '.';

// for use whenever resize event is fired
vi.mock('@/utils/debounce', () => ({
	debounce: (func: (arg: string) => void) => {
		// create the mock for the debounced function and add the cancel method to it
		const debouncedFunction = vi.fn((...args: [string]) =>
			func(...args)
		) as MockedFunction<(...args: [string]) => void> & {
			cancel: typeof vi.fn;
		};
		debouncedFunction.cancel = vi.fn();

		return debouncedFunction;
	},
}));

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

	it('renders the tooltip button', () => {
		expect(button).toBeInTheDocument();
	});

	it('does not show tooltip initially', () => {
		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on mouse enter and hides on mouse leave', () => {
		fireEvent.mouseEnter(button);

		const tooltip = screen.getByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent(mockText);
		expect(tooltip.className.includes('isVisible')).toBe(true);

		fireEvent.mouseLeave(button);

		expect(tooltip.className.includes('isVisible')).toBe(false);
	});

	it('shows tooltip on button focus and hides on blur', () => {
		fireEvent.focus(button);

		const tooltip = screen.getByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent(mockText);
		expect(tooltip.className.includes('isVisible')).toBe(true);

		fireEvent.blur(button);

		expect(tooltip.className.includes('isVisible')).toBe(false);
	});

	it('positions the tooltip to the left if it overflows the screen', () => {
		// simulate overflow scenario
		const getBoundingClientRectMock = vi.fn().mockReturnValue({
			right: window.innerWidth + 10, // simulate tooltip overflowing on the right
		});
		Object.defineProperty(HTMLDivElement.prototype, 'getBoundingClientRect', {
			value: getBoundingClientRectMock,
		});

		// show Tooltip
		fireEvent.mouseEnter(button);
		const tooltip = screen.getByRole('tooltip');

		// force tooltip to recheck position by triggering resize
		fireEvent.resize(window);

		expect(tooltip.className.includes('positionedLeft')).toBe(true);
	});
});

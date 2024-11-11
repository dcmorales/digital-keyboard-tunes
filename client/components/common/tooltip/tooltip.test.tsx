import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

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

		fireEvent.mouseLeave(button);

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on button focus and hides on blur', () => {
		fireEvent.focus(button);

		const tooltip = screen.getByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent(mockText);

		fireEvent.blur(button);

		expect(tooltip).not.toBeInTheDocument();
	});

	it('positions tooltip to the left when too far right', () => {
		// simulate a situation where the tooltip is too far right
		Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
			value: () => ({
				right: window.innerWidth + 100,
			}),
		});

		fireEvent.mouseEnter(button);

		const tooltip = screen.getByRole('tooltip');
		expect(tooltip.className.includes('positionedLeft')).toBe(true);
	});
});

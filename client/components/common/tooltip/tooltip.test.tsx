import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Tooltip from '.';

describe('Tooltip Component', () => {
	const mockTopic = 'Test Topic';
	const mockText = 'Tooltip text';

	beforeEach(() => {
		render(<Tooltip topic={mockTopic} text={mockText} />);
	});

	it('renders the tooltip button', () => {
		const button = screen.getByRole('button', {
			name: `Information for ${mockTopic}`,
		});

		expect(button).toBeInTheDocument();
	});

	it('does not show tooltip initially', () => {
		const tooltip = screen.queryByRole('tooltip');

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on mouse enter and hides on mouse leave', () => {
		const button = screen.getByRole('button', {
			name: `Information for ${mockTopic}`,
		});

		fireEvent.mouseEnter(button);

		const tooltip = screen.getByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent(mockText);

		fireEvent.mouseLeave(button);

		expect(tooltip).not.toBeInTheDocument();
	});

	it('shows tooltip on button focus and hides on blur', () => {
		const button = screen.getByRole('button', {
			name: `Information for ${mockTopic}`,
		});

		fireEvent.focus(button);

		const tooltip = screen.getByRole('tooltip');
		expect(tooltip).toBeInTheDocument();

		fireEvent.blur(button);

		const hiddenTooltip = screen.queryByRole('tooltip');
		expect(hiddenTooltip).not.toBeInTheDocument();
	});
});

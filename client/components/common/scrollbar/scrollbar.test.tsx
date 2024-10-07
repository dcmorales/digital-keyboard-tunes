import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Scrollbar from '.';

describe('Scrollbar', () => {
	beforeEach(() => {
		render(
			<Scrollbar>
				<div>Test Child</div>
			</Scrollbar>
		);
	});

	it('renders correctly with children', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: /Scrollable area/i,
		});
		const childElement = screen.getByText('Test Child');

		expect(scrollbar).toBeInTheDocument();
		expect(childElement).toBeInTheDocument();
	});

	it('has the correct aria attributes', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: /Scrollable area/i,
		});

		expect(scrollbar).toHaveAttribute('aria-controls', 'scrollable-content');
		expect(scrollbar).toHaveAttribute('aria-valuenow', '0');
	});

	it('is focusable', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: /Scrollable area/i,
		});

		scrollbar.focus();

		expect(scrollbar).toHaveAttribute('tabindex', '0');
		expect(document.activeElement).toBe(scrollbar);
	});
});

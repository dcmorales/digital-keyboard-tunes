import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Scrollbar from './scrollbar';

describe('Scrollbar', () => {
	render(
		<Scrollbar>
			<div>Test Child</div>
		</Scrollbar>
	);

	it('renders correctly with children', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: 'Scrollable area',
		});
		const childElement = screen.getByText('Test Child');

		expect(scrollbar).toBeDefined();
		expect(childElement).toBeDefined();
	});

	it('has the correct aria attributes', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: 'Scrollable area',
		});

		expect(scrollbar.getAttribute('aria-controls')).toBe('scrollable-content');
		expect(scrollbar.getAttribute('aria-valuenow')).toBe('0');
	});

	it('is focusable', () => {
		const scrollbar = screen.getByRole('scrollbar', {
			name: 'Scrollable area',
		});

		scrollbar.focus();

		expect(document.activeElement).toBe(scrollbar);
	});
});

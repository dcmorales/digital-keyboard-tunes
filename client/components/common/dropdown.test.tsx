import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Dropdown from './dropdown';

describe('Dropdown', () => {
	render(
		<Dropdown
			options={['a', 'b', 'c']}
			ariaLabel="Select an option"
			title="Test dropdown"
			id="test-id"
		/>
	);

	it('renders the dropdown with all options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		}) as HTMLSelectElement;

		expect(dropdown).toBeDefined();
		expect(dropdown.options[0].textContent).toBe('a');
		expect(dropdown.options[1].textContent).toBe('b');
		expect(dropdown.options[2].textContent).toBe('c');
	});

	it('renders the label for the dropdown', () => {
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		});
		const label = screen.getByText('Test dropdown') as HTMLLabelElement;

		expect(label).toBeDefined();
		expect(label.htmlFor).toBe(dropdown.id);
	});
});

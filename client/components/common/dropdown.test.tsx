import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Dropdown from './dropdown';

describe('Dropdown', () => {
	beforeEach(() => {
		render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				id="test-id"
			/>
		);
	});

	it('renders the dropdown with all options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('a');
		expect(dropdown).toHaveTextContent('b');
		expect(dropdown).toHaveTextContent('c');
	});

	it('renders the label for the dropdown', () => {
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		});
		const label = screen.getByText('Test dropdown');

		expect(dropdown).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('Test dropdown');
	});
});

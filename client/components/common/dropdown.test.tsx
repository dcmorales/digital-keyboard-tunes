import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Dropdown from './dropdown';

describe('Dropdown', () => {
	let handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;

	beforeEach(() => {
		handleChange = vi.fn();
		render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				id="test-id"
				value="b"
				onChange={handleChange}
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

	it('displays the selected value correctly', () => {
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		});

		expect(dropdown).toHaveValue('b');
	});

	it('calls onChange when a new option is selected', () => {
		cleanup();
		const { rerender } = render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				id="test-id"
				value="b"
				onChange={handleChange}
			/>
		);
		const dropdown = screen.getByRole('combobox', {
			name: 'Select an option',
		});

		fireEvent.change(dropdown, { target: { value: 'c' } });

		// update the rendered component to reflect the new value
		rerender(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				id="test-id"
				value="c" // update the value
				onChange={handleChange}
			/>
		);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
		expect(dropdown).toHaveValue('c');
	});
});

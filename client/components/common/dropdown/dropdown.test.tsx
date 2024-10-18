import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Dropdown from '.';

describe('Dropdown', () => {
	let handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;

	beforeEach(() => {
		handleChange = vi.fn();
		render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				name="test-id"
				value="b"
				onChange={handleChange}
			/>
		);
	});

	it('renders the dropdown with all options', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an option/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveTextContent('a');
		expect(dropdown).toHaveTextContent('b');
		expect(dropdown).toHaveTextContent('c');
	});

	it('renders the label for the dropdown', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an option/i,
		});
		const label = screen.getByText('Test dropdown');

		expect(dropdown).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent(/Test dropdown/i);
	});

	it('displays the selected value correctly', () => {
		const dropdown = screen.getByRole('combobox', {
			name: /Select an option/i,
		});

		expect(dropdown).toHaveValue('b');
	});

	it('renders the dropdown as disabled when the disabled prop is true', () => {
		render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Disabled dropdown"
				title="Test dropdown"
				name="test-id"
				value="b"
				disabled
				onChange={handleChange}
			/>
		);

		const dropdown = screen.getByRole('combobox', {
			name: /Disabled dropdown/i,
		});

		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toBeDisabled();
	});

	it('calls onChange when a new option is selected', () => {
		cleanup();
		const { rerender } = render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				name="test-id"
				value="b"
				onChange={handleChange}
			/>
		);
		const dropdown = screen.getByRole('combobox', {
			name: /Select an option/i,
		});

		fireEvent.change(dropdown, { target: { value: 'c' } });

		// update the rendered component to reflect the new value
		rerender(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				name="test-id"
				value="c" // update the value
				onChange={handleChange}
			/>
		);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
		expect(dropdown).toHaveValue('c');
	});

	it('renders a tooltip if provided', () => {
		render(
			<Dropdown
				options={['a', 'b', 'c']}
				ariaLabel="Select an option"
				title="Test dropdown"
				name="test-id"
				value="b"
				tooltip={{ text: 'Helpful tooltip', topic: 'Tooltip topic' }}
				onChange={handleChange}
			/>
		);

		const tooltipButton = screen.getByRole('button', {
			name: /Information for Tooltip topic/i,
		});
		expect(tooltipButton).toBeInTheDocument();

		// show tooltip
		fireEvent.mouseEnter(tooltipButton);

		const tooltip = screen.getByRole('tooltip');
		expect(tooltip).toBeInTheDocument();
		expect(tooltip).toHaveTextContent('Helpful tooltip');

		// hide tooltip
		fireEvent.mouseLeave(tooltipButton);
		expect(tooltip).not.toBeVisible();
	});
});

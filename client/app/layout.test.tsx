import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useKeyboardOptions } from '@/context/keyboard-options-context';
import Layout, { metadata } from './layout';

const TestComponent = () => {
	const { selectedKey, onKeyChange } = useKeyboardOptions();

	return (
		<div>
			<label htmlFor="key-select">Select Key:</label>
			<select
				id="key-select"
				name="key"
				value={selectedKey}
				onChange={onKeyChange}
			>
				<option value="C">C</option>
				<option value="D">D</option>
				<option value="E">E</option>
			</select>
			<p>Selected Key: {selectedKey}</p>
		</div>
	);
};

describe('Layout', () => {
	it('renders children correctly', () => {
		const { getByText } = render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);

		expect(getByText('Hello, world')).toBeInTheDocument();
	});

	it('has correct metadata', () => {
		expect(metadata.title).toBe('Digital Keyboard Tunes');
		expect(metadata.description).toBe('Create custom tunes in key!');
	});

	it('provides the default selected values from context', () => {
		const { getByText } = render(
			<Layout>
				<TestComponent />
			</Layout>
		);

		expect(getByText('Selected Key: C')).toBeInTheDocument();
	});

	it('changes the selected value when a new option is selected', () => {
		const { getByLabelText, getByText } = render(
			<Layout>
				<TestComponent />
			</Layout>
		);
		const select = getByLabelText('Select Key:');

		fireEvent.change(select, { target: { value: 'D' } });

		expect(getByText('Selected Key: D')).toBeInTheDocument();
	});
});

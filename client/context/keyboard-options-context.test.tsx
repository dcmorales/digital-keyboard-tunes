import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from './keyboard-options-context';

const TestComponent = () => {
	const { selectedKey, onKeyChange } = useKeyboardOptions();

	return (
		<div>
			<label htmlFor="key-select">Select Key:</label>
			<select id="key-select" value={selectedKey} onChange={onKeyChange}>
				<option value="C">C</option>
				<option value="D">D</option>
				<option value="E">E</option>
			</select>
			<p>Selected Key: {selectedKey}</p>
		</div>
	);
};

describe('KeyboardOptionsProvider', () => {
	it('provides the initial selected key', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		expect(screen.getByText('Selected Key: C')).toBeInTheDocument();
	});

	it('updates the selected key on change event', () => {
		render(
			<KeyboardOptionsProvider>
				<TestComponent />
			</KeyboardOptionsProvider>
		);

		const select = screen.getByLabelText('Select Key:');

		fireEvent.change(select, { target: { value: 'D' } });

		expect(screen.getByText('Selected Key: D')).toBeInTheDocument();
	});

	it('throws an error when used outside of the provider', () => {
		const TestComponentOutsideProvider = () => {
			useKeyboardOptions();
			return null;
		};
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		expect(() => {
			render(<TestComponentOutsideProvider />);
		}).toThrow(
			'useKeyboardOptions must be used within a KeyboardOptionsProvider'
		);

		consoleErrorSpy.mockRestore();
	});
});

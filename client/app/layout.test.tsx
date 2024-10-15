import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContextTestComponent from '@/mocks/context-test-component';
import Layout, { metadata } from './layout';

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
				<ContextTestComponent />
			</Layout>
		);

		expect(getByText(/Selected key: C/i)).toBeInTheDocument();
	});

	it('changes the selected value when a new option is selected', () => {
		const { getByLabelText, getByText } = render(
			<Layout>
				<ContextTestComponent />
			</Layout>
		);
		const select = getByLabelText(/Select key:/i);

		fireEvent.change(select, { target: { value: 'D' } });

		expect(getByText(/Selected key: D/i)).toBeInTheDocument();
	});
});

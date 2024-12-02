import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContextTestComponent from '@/mocks/context-test-component';
import Layout, { metadata } from './layout';

describe('Root Layout', () => {
	it('renders the Header component', () => {
		render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);
		const header = screen.getByRole('heading');

		expect(header).toBeInTheDocument();
	});

	it('renders the menu-root div', () => {
		render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);
		const menuRoot = screen.getByTestId('menu-root');

		expect(menuRoot).toBeInTheDocument();
	});

	it('renders children correctly', () => {
		const { getByText } = render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);

		expect(getByText('Hello, world')).toBeInTheDocument();
	});

	it('renders the footer', () => {
		render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);
		const footer = screen.getByRole('contentinfo');

		expect(footer).toBeInTheDocument();
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

		// all values are tested in context test suite
		expect(getByText(/Selected key: C/i)).toBeInTheDocument();
		expect(getByText(/Selected octave: 4/i)).toBeInTheDocument();
		expect(getByText(/Selected waveform: sine/i)).toBeInTheDocument();
	});

	it('changes the selected value when a new option is selected', () => {
		const { getByLabelText, getByText } = render(
			<Layout>
				<ContextTestComponent />
			</Layout>
		);
		const keySelect = getByLabelText(/Select key:/i);
		const octaveSelect = getByLabelText(/Select octave:/i);
		const waveformSelect = getByLabelText(/Select waveform:/i);

		fireEvent.change(keySelect, { target: { value: 'D' } });
		fireEvent.change(octaveSelect, { target: { value: '5' } });
		fireEvent.change(waveformSelect, { target: { value: 'square' } });

		// all values are tested in context test suite
		expect(getByText(/Selected key: D/i)).toBeInTheDocument();
		expect(getByText(/Selected octave: 5/i)).toBeInTheDocument();
		expect(getByText(/Selected waveform: square/i)).toBeInTheDocument();
	});
});

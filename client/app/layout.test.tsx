import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Layout, { metadata } from './layout';

describe('Layout', () => {
	it('renders children correctly', () => {
		const { getByText } = render(
			<Layout>
				<div>Hello, world</div>
			</Layout>
		);

		expect(getByText('Hello, world')).toBeDefined();
	});

	it('has correct metadata', () => {
		expect(metadata.title).toBe('Digital Keyboard Tunes');
		expect(metadata.description).toBe('Create custom tunes in key!');
	});
});

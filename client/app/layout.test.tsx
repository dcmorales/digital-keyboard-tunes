import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
});

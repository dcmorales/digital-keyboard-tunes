import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Dropdown from './dropdown';

describe('Header', () => {
	render(<Dropdown options={['a', 'b', 'c']} ariaLabel="Test dropdown" />);

	it('renders the dropdown', () => {
		expect(
			screen.getByRole('combobox', { name: 'Test dropdown' })
		).toBeDefined();
	});
});

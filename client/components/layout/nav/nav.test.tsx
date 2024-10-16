import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Nav from '.';

describe('Header', () => {
	beforeEach(() => {
		render(<Nav />);
	});

	it('renders the nav', () => {
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
	});
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon from './icon';

describe('Icon', () => {
	it('renders the gear svg', () => {
		render(<Icon name="gear" />);
		const gearIcon = screen.getByTestId('svg-gear');

		expect(gearIcon).toBeInTheDocument();
	});

	it('renders the chevron svg', () => {
		render(<Icon name="chevron" />);
		const chevronIcon = screen.getByTestId('svg-chevron');

		expect(chevronIcon).toBeInTheDocument();
	});
});

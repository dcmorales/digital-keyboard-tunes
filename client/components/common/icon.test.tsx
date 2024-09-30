import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon from './icon';

describe('Icon', () => {
	it('renders the gear svg', () => {
		render(<Icon name="gear" />);

		expect(screen.getByTestId('svg-gear')).toBeInTheDocument();
	});

	it('renders the chevron svg', () => {
		render(<Icon name="chevron" />);

		expect(screen.getByTestId('svg-chevron')).toBeInTheDocument();
	});
});

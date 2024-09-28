import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Icon from './icon';

describe('Icon', () => {
	it('renders the gear svg', () => {
		render(<Icon name="gear" />);

		expect(screen.getByTestId('svg-gear')).toBeDefined();
	});

	it('renders the chevron svg', () => {
		render(<Icon name="chevron" />);

		expect(screen.getByTestId('svg-chevron')).toBeDefined();
	});
});

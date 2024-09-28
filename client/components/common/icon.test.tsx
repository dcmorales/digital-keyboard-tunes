import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Icon from './icon';

describe('Icon', () => {
	render(<Icon />);

	it('renders the svg', () => {
		expect(screen.getByTestId('svg')).toBeDefined();
	});
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon, { type IconProps } from '.';

describe('Icon', () => {
	const iconNames: IconProps['name'][] = [
		'close',
		'gear',
		'github',
		'info',
		'menu',
		'play',
		'repeat',
		'shuffle',
		'stop',
	];
	const sizes: IconProps['size'][] = ['x-small', 'small', 'medium', 'large'];

	it('renders the correct icon based on the name prop', () => {
		iconNames.forEach((name) => {
			render(<Icon name={name} />);
			const icon = screen.getByTestId(`svg-${name}`);

			expect(icon).toBeInTheDocument();
		});
	});

	// test each size in its own test to avoid conflicting id's
	it.each(sizes)('applies the correct class name for size "%s"', (size) => {
		render(<Icon name="gear" size={size} />);
		const gearIcon = screen.getByTestId('svg-gear');

		expect(gearIcon.parentElement!.className.includes(size!)).toBe(true);
	});
});

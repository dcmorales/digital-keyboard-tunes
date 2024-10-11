import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon from '.';

describe('Icon', () => {
	it('renders the chevron svg', () => {
		render(<Icon name="chevron" />);
		const chevronIcon = screen.getByTestId('svg-chevron');

		expect(chevronIcon).toBeInTheDocument();
	});

	it('renders the gear svg', () => {
		render(<Icon name="gear" />);
		const gearIcon = screen.getByTestId('svg-gear');

		expect(gearIcon).toBeInTheDocument();
	});

	it('renders the play svg', () => {
		render(<Icon name="play" />);
		const playIcon = screen.getByTestId('svg-play');

		expect(playIcon).toBeInTheDocument();
	});

	it('renders the stop svg', () => {
		render(<Icon name="stop" />);
		const stopIcon = screen.getByTestId('svg-stop');

		expect(stopIcon).toBeInTheDocument();
	});
});

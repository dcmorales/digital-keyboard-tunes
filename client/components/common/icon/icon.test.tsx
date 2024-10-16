import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon from '.';

describe('Icon', () => {
	it('applies the correct class name based on size prop', () => {
		render(<Icon name="github" size="small" />);
		const githubIcon = screen.getByTestId('svg-github');

		expect(githubIcon.parentElement!.className.includes('small')).toBe(true);
	});

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

	it('renders the repeat svg', () => {
		render(<Icon name="repeat" />);
		const repeatIcon = screen.getByTestId('svg-repeat');

		expect(repeatIcon).toBeInTheDocument();
	});

	it('renders the shuffle svg', () => {
		render(<Icon name="shuffle" />);
		const repeatIcon = screen.getByTestId('svg-shuffle');

		expect(repeatIcon).toBeInTheDocument();
	});

	it('renders the stop svg', () => {
		render(<Icon name="stop" />);
		const stopIcon = screen.getByTestId('svg-stop');

		expect(stopIcon).toBeInTheDocument();
	});
});

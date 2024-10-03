import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import AudioControls from './audio-controls';

describe('Full Keyboard', () => {
	beforeEach(() => {
		render(<AudioControls />);
	});

	it('renders a labeled group div', () => {
		const audioControls = screen.getByRole('group', {
			name: 'Audio controls',
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the play button', () => {
		const button = screen.getByRole('button', { name: 'Play the scale' });

		expect(button).toBeInTheDocument();
	});
});

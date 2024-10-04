import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ControlPanel from './control-panel';

describe('Control Panel', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<ControlPanel />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the control panel', () => {
		const controlPanel = screen.getByRole('region', {
			name: 'Audio controls and selected keyboard',
		});

		expect(controlPanel).toBeInTheDocument();
	});

	it('renders the selected keyboard', () => {
		const keyboardFull = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(keyboardFull).toBeInTheDocument();
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: 'Audio controls',
		});

		expect(audioControls).toBeInTheDocument();
	});
});

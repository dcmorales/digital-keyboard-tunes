import { render, screen, within } from '@testing-library/react';
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
		const keyboardSelected = screen.getByRole('group', {
			name: 'Selected keyboard',
		});

		expect(keyboardSelected).toBeInTheDocument();
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: 'Audio controls',
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('rearranges the 13 notes correctly', () => {
		const keyboardSelected = screen.getByRole('group', {
			name: 'Selected keyboard',
		});
		const noteButtons = within(keyboardSelected).getAllByRole('button');
		const noteTexts = noteButtons.map((button) =>
			// remove whitespace
			button.textContent?.trim().replace(/\s+/g, '')
		);

		expect(noteTexts).toEqual([
			'C4',
			'D♭4',
			'D4',
			'E♭4',
			'E4',
			'F4',
			'G♭4',
			'G4',
			'A♭4',
			'A4',
			'B♭4',
			'B4',
			'C5',
		]);
	});
});

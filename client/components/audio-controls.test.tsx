import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import AudioControls from './audio-controls';

const mockFullNoteOptions: FullNote[] = [
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
];

describe('Audio Controls', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<AudioControls fullNotes={mockFullNoteOptions} />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the audio controls div', () => {
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

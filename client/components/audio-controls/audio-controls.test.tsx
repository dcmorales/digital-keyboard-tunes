import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { playSelectedNotes } from '@/utils/audio-control-functions';
import AudioControls from '.';

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

vi.mock('@/utils/audio-control-functions', () => ({
	playSelectedNotes: vi.fn(),
}));

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

	it('handles the play click', () => {
		const button = screen.getByRole('button', { name: 'Play the scale' });

		fireEvent.click(button);

		expect(playSelectedNotes).toHaveBeenCalledWith(
			mockFullNoteOptions,
			expect.any(String),
			expect.any(Function)
		);
	});
});

import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import { playNote, stopNote } from '@/utils/key-functions';
import AudioControls from '.';

vi.mock('@/utils/key-functions', () => ({
	playNote: vi.fn(),
	stopNote: vi.fn(),
}));

describe('Audio Controls', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		render(
			<KeyboardOptionsProvider>
				<AudioControls />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: /Audio controls/i,
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the play button', () => {
		const button = screen.getByRole('button', { name: /Play the scale/i });

		expect(button).toBeInTheDocument();
	});

	it('handles the play click', async () => {
		vi.useFakeTimers();

		const button = screen.getByRole('button', { name: /Play the scale/i });
		const mockNumberOfNotes = 13; // length of chromatic scale

		await act(async () => {
			fireEvent.click(button);

			vi.advanceTimersByTime(0); // start timer

			Array.from({ length: mockNumberOfNotes }, (_, index) => {
				// fast-forward time to when the note should be played
				vi.advanceTimersByTime(200);
				expect(playNote).toHaveBeenCalledTimes(index + 1);

				// fast-forward time to when the next note should be stopped
				vi.advanceTimersByTime(200);
				expect(stopNote).toHaveBeenCalledTimes(index + 1);
			});
		});
	});
});

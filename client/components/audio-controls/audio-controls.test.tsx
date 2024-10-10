import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/audio-utils';
import AudioControls from '.';

vi.mock('@/utils/audio-utils', () => ({
	fadeOutNote: vi.fn(),
	noteDurationInMs: vi.fn(),
	playNote: vi.fn(),
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
		const mockOrderedScaleNotes = ['C4', 'D♭4', 'D4', 'E♭4', 'E4', 'F4', 'G♭4'];

		vi.mocked(noteDurationInMs).mockReturnValue(200); // simulate 200ms per note
		vi.mocked(playNote).mockImplementation(() => Promise.resolve());
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		fireEvent.click(button);

		for (let i = 0; i < mockOrderedScaleNotes.length; i++) {
			await act(async () => {
				vi.advanceTimersByTime(200); // move forward by the note duration
			});

			expect(playNote).toHaveBeenCalledWith(mockOrderedScaleNotes[i], 'sine');
		}

		await act(async () => {
			vi.advanceTimersByTime(200 * mockOrderedScaleNotes.length); // move to the end
		});

		expect(fadeOutNote).toHaveBeenCalled();
	});
});

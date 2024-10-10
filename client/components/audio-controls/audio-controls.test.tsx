import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/key-utils';
import AudioControls from '.';

vi.mock('@/utils/key-utils', () => ({
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
		const mockOrderedScaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

		vi.mocked(noteDurationInMs).mockReturnValue(200); // simulate 200ms per note
		vi.mocked(playNote).mockImplementation(() => Promise.resolve());
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		await act(async () => {
			fireEvent.click(button);
		});

		for (let i = 0; i < mockOrderedScaleNotes.length; i++) {
			vi.advanceTimersByTime(200 * (i + 1)); // move forward by the note duration

			expect(playNote).toHaveBeenCalledWith(mockOrderedScaleNotes[i], 'sine');
		}

		vi.advanceTimersByTime(200 * mockOrderedScaleNotes.length); // move to the end
		expect(fadeOutNote).toHaveBeenCalled();
	});
});

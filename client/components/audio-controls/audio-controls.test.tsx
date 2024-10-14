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

	it('renders the play button initially', () => {
		const playButton = screen.getByRole('button', { name: /Play the scale/i });

		expect(playButton).toBeInTheDocument();
	});

	it('handles the play click', async () => {
		vi.useFakeTimers();

		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		const mockOrderedScaleNotes = ['C4', 'D♭4', 'D4', 'E♭4', 'E4', 'F4', 'G♭4'];

		vi.mocked(noteDurationInMs).mockReturnValue(200); // simulate 200ms per note
		vi.mocked(playNote).mockImplementation(() => Promise.resolve());
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		fireEvent.click(playButton);

		for (let i = 0; i < mockOrderedScaleNotes.length; i++) {
			await act(() => {
				vi.advanceTimersByTime(200); // move forward by the note duration
			});

			expect(playNote).toHaveBeenCalledWith(mockOrderedScaleNotes[i], 'sine');
		}

		await act(() => {
			vi.advanceTimersByTime(200 * mockOrderedScaleNotes.length); // move to the end
		});

		expect(fadeOutNote).toHaveBeenCalled();
	});

	it('renders repeat and shuffle buttons and removes play button after playing', async () => {
		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		fireEvent.click(playButton);

		const repeatButton = screen.getByRole('button', {
			name: /Repeat the scale/i,
		});
		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});

		expect(repeatButton).toBeInTheDocument();
		expect(shuffleButton).toBeInTheDocument();
		expect(playButton).not.toBeInTheDocument();
	});

	it('handles the repeat click', async () => {
		vi.useFakeTimers();

		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		const mockNotes = ['C4', 'D♭4', 'D4', 'E♭4', 'E4', 'F4', 'G♭4', 'G4'];

		fireEvent.click(playButton); // make repeat button visible with initial playback

		const repeatButton = screen.getByRole('button', {
			name: /Repeat the scale/i,
		});

		await act(() => {
			vi.advanceTimersByTime(200 * mockNotes.length); // move to the end
		});

		fireEvent.click(repeatButton);
		expect(repeatButton).toBeDisabled();

		// ensure the same notes are played again
		for (let i = 0; i < mockNotes.length; i++) {
			await act(() => {
				vi.advanceTimersByTime(200); // move forward by the note duration
			});

			expect(playNote).toHaveBeenCalledWith(mockNotes[i], 'sine');
		}

		expect(repeatButton).not.toBeDisabled();
	});

	it('handles the stop click', async () => {
		vi.useFakeTimers();

		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		const stopButton = screen.getByRole('button', { name: /Stop the scale/i });

		fireEvent.click(playButton); // start playback
		expect(stopButton).not.toBeDisabled();

		// simulate time passing for a note
		await act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(playNote).toHaveBeenCalled();

		fireEvent.click(stopButton);

		expect(stopButton).toBeDisabled();
		expect(fadeOutNote).toHaveBeenCalled();
	});
});

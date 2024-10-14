import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ContextTestComponent from '@/mocks/context-test-component';
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
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: /Audio controls/i,
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the play button initially; repeat and shuffle buttons when order is random', async () => {
		const playButton = screen.getByRole('button', { name: /Play the scale/i });

		expect(playButton).toBeInTheDocument();

		// use mock component to update order
		const orderSelect = screen.getByLabelText('Select order:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });

		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});
		const repeatButton = screen.getByRole('button', {
			name: /Repeat the scale/i,
		});

		expect(playButton).not.toBeInTheDocument();
		expect(shuffleButton).toBeInTheDocument();
		expect(repeatButton).toBeInTheDocument();
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

	it('handles the shuffle click', async () => {
		vi.useFakeTimers();

		const mockScaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
		// use mock component to update order and scale
		const orderSelect = screen.getByLabelText('Select order:');
		const scaleSelect = screen.getByLabelText('Select scale:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });
		fireEvent.change(scaleSelect, { target: { value: 'major' } });

		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});

		vi.mocked(noteDurationInMs).mockReturnValue(200); // simulate 200ms per note
		const playNoteMock = vi.fn().mockImplementation(() => Promise.resolve());
		vi.mocked(playNote).mockImplementation(playNoteMock);
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		// capture notes played in an array to compare later
		const capturePlayedNotes = async (offset: number) => {
			fireEvent.click(shuffleButton);
			expect(shuffleButton).toBeDisabled();
			const playedNotes = [];
			for (let i = 0; i < mockScaleNotes.length; i++) {
				await act(() => {
					vi.advanceTimersByTime(200); // move forward by the note duration
				});
				playedNotes.push(playNoteMock.mock.calls[offset + i][0]); // capture the note played
			}
			expect(shuffleButton).not.toBeDisabled();

			return playedNotes;
		};

		const firstPlayedNotes = await capturePlayedNotes(0);
		const secondPlayedNotes = await capturePlayedNotes(mockScaleNotes.length);

		// check that both sets of played notes are different
		const notesAreDifferent =
			firstPlayedNotes.join(',') !== secondPlayedNotes.join(',');
		expect(notesAreDifferent).toBe(true);

		expect(playNoteMock).toHaveBeenCalledTimes(16); // 8 notes for each click
	});

	it('handles the repeat click', async () => {
		vi.useFakeTimers();

		const mockScaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
		// use mock component to update order and scale
		const orderSelect = screen.getByLabelText('Select order:');
		const scaleSelect = screen.getByLabelText('Select scale:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });
		fireEvent.change(scaleSelect, { target: { value: 'major' } });

		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});
		const repeatButton = screen.getByRole('button', {
			name: /Repeat the scale/i,
		});

		vi.mocked(noteDurationInMs).mockReturnValue(200); // simulate 200ms per note
		const playNoteMock = vi.fn().mockImplementation(() => Promise.resolve());
		vi.mocked(playNote).mockImplementation(playNoteMock);
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		// capture notes played in an array to compare later
		const capturePlayedNotes = async (button: HTMLElement, offset: number) => {
			fireEvent.click(button);
			expect(button).toBeDisabled();
			const playedNotes = [];
			for (let i = 0; i < mockScaleNotes.length; i++) {
				await act(() => {
					vi.advanceTimersByTime(200); // move forward by the note duration
				});
				playedNotes.push(playNoteMock.mock.calls[offset + i][0]); // capture the note played
			}
			expect(button).not.toBeDisabled();

			return playedNotes;
		};

		const firstPlayedNotes = await capturePlayedNotes(shuffleButton, 0);
		const secondPlayedNotes = await capturePlayedNotes(
			repeatButton,
			mockScaleNotes.length
		);

		// check that both sets of played notes are the same
		const notesAreTheSame =
			firstPlayedNotes.join(',') === secondPlayedNotes.join(',');
		expect(notesAreTheSame).toBe(true);

		expect(playNoteMock).toHaveBeenCalledTimes(16); // 8 notes for each click
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

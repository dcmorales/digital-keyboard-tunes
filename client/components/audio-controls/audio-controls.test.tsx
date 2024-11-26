import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ContextTestComponent from '@/mocks/context-test-component';
import { FullNote } from '@/types/keyboard-option-types';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/audio-utils';
import AudioControls from '.';

vi.mock('@/styles/abstracts/variables.module.scss', () => ({
	default: {
		tabletBreakpoint: '1024px',
	},
}));

vi.mock('@/utils/audio-utils', () => ({
	fadeOutNote: vi.fn(),
	noteDurationInMs: vi.fn(),
	playNote: vi.fn(),
}));

describe('Audio Controls', () => {
	const mockScaleNotes = [
		'C4',
		'D4',
		'E4',
		'F4',
		'G4',
		'A4',
		'B4',
		'C5',
	] as FullNote[];
	const noteDuration = 200;
	let playNoteMock: ReturnType<typeof vi.fn>;

	// capture notes played in an array to compare in shuffle and repeat click tests
	const capturePlayedNotes = async (
		button: HTMLElement,
		offset: number = 0
	) => {
		fireEvent.click(button);
		expect(button).toBeDisabled(); // button should be disabled while notes are playing

		const playedNotes = [];

		for (let i = 0; i < mockScaleNotes.length; i++) {
			await act(() => {
				vi.advanceTimersByTime(noteDuration); // move forward by the note duration
			});
			// capture the note played; offset is necessary for shuffle test
			playedNotes.push(playNoteMock.mock.calls[offset + i][0]);
		}

		expect(button).not.toBeDisabled(); // button is reset after notes play

		return playedNotes;
	};

	beforeEach(() => {
		vi.clearAllMocks();

		// mock functions that are called during play, shuffle, and repeat clicks
		vi.mocked(noteDurationInMs).mockReturnValue(noteDuration); // simulate 200ms per note
		playNoteMock = vi.fn().mockImplementation(() => Promise.resolve());
		vi.mocked(playNote).mockImplementation(playNoteMock);
		vi.mocked(fadeOutNote).mockImplementation(() => {});

		render(
			// ContextTestComponent makes context state updates in tests possible
			<KeyboardOptionsProvider>
				<AudioControls
					lastPlayedNotes={mockScaleNotes}
					setLastPlayedNotes={vi.fn()}
				/>
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);

		// update scale using test component; 'major' is selected so that mockScaleNotes is correct
		const scaleSelect = screen.getByLabelText('Select scale:');
		fireEvent.change(scaleSelect, { target: { value: 'major' } });
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: /Audio controls/i,
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the play button initially without shuffle or repeat buttons', () => {
		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		const shuffleButton = screen.queryByRole('button', {
			name: /Shuffle the scale/i,
		});
		const repeatButton = screen.queryByRole('button', {
			name: /Repeat the scale/i,
		});

		expect(playButton).toBeInTheDocument();
		expect(shuffleButton).not.toBeInTheDocument();
		expect(repeatButton).not.toBeInTheDocument();
	});

	it('renders the repeat and shuffle buttons when the order is random', () => {
		// update order using test component
		const orderSelect = screen.getByLabelText('Select order:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });

		const playButton = screen.queryByRole('button', {
			name: /Play the scale/i,
		});
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

		fireEvent.click(playButton);
		expect(playButton).toBeDisabled();

		// check that each note in the scale plays after the specified time
		for (let i = 0; i < mockScaleNotes.length; i++) {
			await act(() => {
				vi.advanceTimersByTime(noteDuration); // move forward by the note duration
			});

			expect(playNote).toHaveBeenCalledWith(mockScaleNotes[i], 'sine');
		}

		await act(() => {
			vi.advanceTimersByTime(noteDuration * mockScaleNotes.length); // move to the end
		});

		expect(fadeOutNote).toHaveBeenCalled();
		expect(playButton).not.toBeDisabled(); // button is reset after notes play

		vi.useRealTimers();
	});

	it('handles the shuffle click', async () => {
		vi.useFakeTimers();

		// update order using test component
		const orderSelect = screen.getByLabelText('Select order:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });

		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});

		const firstPlayedNotes = await capturePlayedNotes(shuffleButton, 0);
		const secondPlayedNotes = await capturePlayedNotes(
			shuffleButton,
			mockScaleNotes.length
		);

		// check that both sets of played notes are different
		const notesAreDifferent =
			firstPlayedNotes.join(',') !== secondPlayedNotes.join(',');
		expect(notesAreDifferent).toBe(true);

		expect(playNoteMock).toHaveBeenCalledTimes(16); // 8 notes for each click

		vi.useRealTimers();
	});

	it('handles the repeat click', async () => {
		vi.useFakeTimers();

		// update order using test component
		const orderSelect = screen.getByLabelText('Select order:');
		fireEvent.change(orderSelect, { target: { value: 'random' } });

		const shuffleButton = screen.getByRole('button', {
			name: /Shuffle the scale/i,
		});
		const repeatButton = screen.getByRole('button', {
			name: /Repeat the scale/i,
		});

		const firstPlayedNotes = await capturePlayedNotes(shuffleButton);
		const secondPlayedNotes = await capturePlayedNotes(repeatButton);

		// check that both sets of played notes are the same
		const notesAreTheSame =
			firstPlayedNotes.join(',') === secondPlayedNotes.join(',');
		expect(notesAreTheSame).toBe(true);

		expect(playNoteMock).toHaveBeenCalledTimes(16); // 8 notes for each click

		vi.useRealTimers();
	});

	it('handles the stop click', async () => {
		vi.useFakeTimers();

		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		const stopButton = screen.getByRole('button', { name: /Stop the scale/i });

		fireEvent.click(playButton); // start playback
		expect(stopButton).not.toBeDisabled();

		// simulate time passing for a note
		await act(() => {
			vi.advanceTimersByTime(noteDuration);
		});
		expect(playNote).toHaveBeenCalled();

		fireEvent.click(stopButton);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(stopButton).toBeDisabled(); // button is reset after click

		vi.useRealTimers();
	});

	it('updates tooltip position based on window width', async () => {
		vi.useFakeTimers();
		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		fireEvent.mouseEnter(playButton);

		const tooltip = screen.getByRole('tooltip');

		expect(tooltip).toBeInTheDocument();
		expect(tooltip.className.includes('right')).toBe(true); // initial position

		// resize the window to below the tablet breakpoint
		window.innerWidth = 768;
		fireEvent.resize(window);

		await act(() => {
			vi.advanceTimersByTime(300);
		});

		// position updates
		expect(tooltip.className.includes('right')).toBe(false);
		expect(tooltip.className.includes('top')).toBe(true);

		// resize the window back above the breakpoint
		window.innerWidth = 1200;
		fireEvent.resize(window);

		await act(() => {
			vi.advanceTimersByTime(300);
		});

		// position is reset
		expect(tooltip.className.includes('top')).toBe(false);
		expect(tooltip.className.includes('right')).toBe(true);

		vi.useRealTimers();
	});
});

import { describe, it, expect, beforeEach, vi } from 'vitest';

import { FullNote } from '@/types/keyboard-option-types';
import { playNote, stopNote } from '@/utils/key-functions';
import { playSelectedNotes } from './audio-control-functions';

vi.mock('@/utils/key-functions');

describe('playSelectedNotes', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	it('should call playNote and stopNote at the correct times', () => {
		const mockNotes = ['C4', 'D4', 'E4'] as FullNote[];
		const mockWaveform = 'sine';
		playSelectedNotes(mockNotes, mockWaveform);

		// Fast-forward time to when the first note should be played
		vi.advanceTimersByTime(0);
		expect(playNote).toHaveBeenCalledWith('C4', mockWaveform);

		// Fast-forward time to when the first note should be stopped
		vi.advanceTimersByTime(200);
		expect(stopNote).toHaveBeenCalledTimes(1);

		// Fast-forward time to when the second note should be played
		vi.advanceTimersByTime(400);
		expect(playNote).toHaveBeenCalledWith('D4', mockWaveform);

		// Fast-forward time to when the second note should be stopped
		vi.advanceTimersByTime(200);
		expect(stopNote).toHaveBeenCalledTimes(2);

		// Fast-forward time to when the third note should be played
		vi.advanceTimersByTime(400);
		expect(playNote).toHaveBeenCalledWith('E4', mockWaveform);

		// Fast-forward time to when the third note should be stopped
		vi.advanceTimersByTime(200);
		expect(stopNote).toHaveBeenCalledTimes(3);
	});
});

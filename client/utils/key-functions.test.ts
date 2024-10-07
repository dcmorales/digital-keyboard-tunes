import { beforeEach, describe, expect, it, vi } from 'vitest';

import { playNote, stopNote } from './key-functions';

// create interfaces for the global objects
interface GlobalAudioContext extends Window {
	AudioContext: new () => AudioContext;
	currentOscillator: OscillatorNode | null;
}

let audioContextMock: AudioContext;
let oscillatorMock: OscillatorNode;

beforeEach(() => {
	// mock global AudioContext
	(global as unknown as GlobalAudioContext).AudioContext = vi.fn(
		() => audioContextMock
	);

	// create a mock AudioContext
	audioContextMock = {
		resume: vi.fn().mockResolvedValue(undefined),
		createOscillator: vi.fn(() => oscillatorMock),
		destination: {},
	} as unknown as AudioContext;

	// initialize currentOscillator to null
	(global as unknown as GlobalAudioContext).currentOscillator = null;

	// create a mock oscillator
	oscillatorMock = {
		connect: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
		frequency: { value: 0 },
	} as unknown as OscillatorNode;
});

describe('Key Functions', () => {
	it('plays a note', async () => {
		await playNote('C4', 'sine');

		expect(audioContextMock.resume).toHaveBeenCalled();
		expect(audioContextMock.createOscillator).toHaveBeenCalled();
		expect(oscillatorMock.frequency.value).toBe(261.625565300598634);
		expect(oscillatorMock.connect).toHaveBeenCalledWith(
			audioContextMock.destination
		);
		expect(oscillatorMock.start).toHaveBeenCalled();
	});

	it('stops the currently playing oscillator and resets it', async () => {
		// start playing a note to create an oscillator
		await playNote('C4', 'sine');

		stopNote();

		expect(oscillatorMock.stop).toHaveBeenCalled();
		expect(
			(global as unknown as GlobalAudioContext).currentOscillator
		).toBeNull();
	});
});

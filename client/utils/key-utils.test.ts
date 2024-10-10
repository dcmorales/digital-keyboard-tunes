import { beforeEach, describe, expect, it, vi } from 'vitest';

import { playNote, stopNote } from './key-utils';

// create interfaces for the global objects
interface GlobalAudioContext extends Window {
	AudioContext: new () => AudioContext;
	currentOscillator: OscillatorNode | null;
}

let audioContextMock: AudioContext;
let oscillatorMock: OscillatorNode;
let gainNodeMock: GainNode;

beforeEach(() => {
	// mock global AudioContext
	(global as unknown as GlobalAudioContext).AudioContext = vi.fn(
		() => audioContextMock
	);

	// create a mock AudioContext
	audioContextMock = {
		resume: vi.fn().mockResolvedValue(undefined),
		createOscillator: vi.fn(() => oscillatorMock),
		createGain: vi.fn(() => gainNodeMock),
		currentTime: 0,
		destination: {},
	} as unknown as AudioContext;

	// initialize currentOscillator to null
	(global as unknown as GlobalAudioContext).currentOscillator = null;

	// create a mock oscillator
	oscillatorMock = {
		connect: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
		frequency: { value: 0, setValueAtTime: vi.fn() },
	} as unknown as OscillatorNode;

	// create a mock gain node
	gainNodeMock = {
		connect: vi.fn(),
		disconnect: vi.fn(),
		gain: {
			setValueAtTime: vi.fn(),
			linearRampToValueAtTime: vi.fn(),
			value: 1,
		},
	} as unknown as GainNode;
});

afterEach(() => {
	vi.clearAllMocks();
	// reset oscillator
	stopNote();
});

describe('Key Utils', () => {
	it('plays a note', async () => {
		await playNote('C4', 'sine');

		expect(audioContextMock.resume).toHaveBeenCalled();
		expect(audioContextMock.createOscillator).toHaveBeenCalled();
		expect(audioContextMock.createGain).toHaveBeenCalled();
		expect(oscillatorMock.frequency.value).toBe(261.625565300598634);
		expect(oscillatorMock.connect).toHaveBeenCalledWith(gainNodeMock);
		expect(gainNodeMock.connect).toHaveBeenCalledWith(
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

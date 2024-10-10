import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
	fadeOutNote,
	noteDurationInMs,
	playNote,
	stopNote,
} from './audio-utils';

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

	// create a mock oscillator
	oscillatorMock = {
		connect: vi.fn(),
		disconnect: vi.fn(),
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
	// reset oscillator and gain node
	stopNote();
});

describe('Audio Utils', () => {
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

	it('changes the frequency of an existing oscillator', async () => {
		await playNote('C4', 'sine');

		// call playNote again with a different note to change frequency
		await playNote('D4', 'sine');

		expect(oscillatorMock.frequency.setValueAtTime).toHaveBeenCalledWith(
			293.66476791740756,
			audioContextMock.currentTime
		);
		expect(oscillatorMock.frequency.setValueAtTime).toHaveBeenCalledTimes(1);
	});

	it('stops the currently playing note', async () => {
		await playNote('C4', 'sine');

		expect(oscillatorMock).not.toBeNull();
		expect(gainNodeMock).not.toBeNull();

		stopNote();

		expect(oscillatorMock.stop).toHaveBeenCalled();
		expect(oscillatorMock.disconnect).toHaveBeenCalled();
		expect(gainNodeMock.disconnect).toHaveBeenCalled();
		expect(gainNodeMock.gain.setValueAtTime).toHaveBeenCalled();
	});

	it('fades out and stops the oscillator', async () => {
		vi.useFakeTimers();

		await playNote('C4', 'sine');

		expect(gainNodeMock.gain.setValueAtTime).toHaveBeenCalledWith(
			1,
			audioContextMock.currentTime
		);

		fadeOutNote();

		expect(gainNodeMock.gain.linearRampToValueAtTime).toHaveBeenCalledWith(
			0,
			audioContextMock.currentTime + 0.2
		);

		// fast-forward time by 200 ms to simulate the fade-out duration
		vi.advanceTimersByTime(200);

		expect(oscillatorMock.stop).toHaveBeenCalled();
		expect(oscillatorMock.disconnect).toHaveBeenCalled();
		expect(gainNodeMock.disconnect).toHaveBeenCalled();

		vi.useRealTimers();
	});

	it('calculates note durations correctly', () => {
		expect(noteDurationInMs(120, '1/4')).toBe(500); // 60000 / 120 = 500 ms
		expect(noteDurationInMs(60, '1/4')).toBe(1000); // 60000 / 60 = 1000 ms

		expect(noteDurationInMs(120, '1/8')).toBe(250); // 60000 / 120 / 2 = 250 ms
		expect(noteDurationInMs(60, '1/8')).toBe(500); // 60000 / 60 / 2 = 500 ms

		expect(noteDurationInMs(120, '1/16')).toBe(125); // 60000 / 120 / 4 = 125 ms
		expect(noteDurationInMs(60, '1/16')).toBe(250); // 60000 / 60 / 4 = 250 ms
	});
});
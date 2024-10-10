import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
});

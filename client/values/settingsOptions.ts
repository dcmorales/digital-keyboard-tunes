import { NoteKey } from '@/types/keyboard-option-types';

export const noteOptions: NoteKey[] = [
	'C',
	'D♭',
	'D',
	'E♭',
	'E',
	'F',
	'G♭',
	'G',
	'A♭',
	'A',
	'B♭',
	'B',
];

const octaveOptions = Array.from({ length: 6 }, (_, index) => `${index + 1}`);

const waveformOptions = ['sine', 'sawtooth', 'triangle', 'square'];

export const settingsOptions = {
	key: {
		options: noteOptions,
		ariaLabel: 'Select a key',
		title: 'Key',
		name: 'key',
	},
	octave: {
		options: octaveOptions,
		ariaLabel: 'Select an octave',
		title: 'Octave',
		name: 'octave',
	},
	waveform: {
		options: waveformOptions,
		ariaLabel: 'Select a waveform',
		title: 'Waveform',
		name: 'waveform',
	},
};

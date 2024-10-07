// settingsOptions
// Defines options for keyboard-settings.
// Each object in settingsOptions represents a dropdown within the settings.
// The object provides all values except for those provided by the React context.

import type {
	NoteKey,
	OctaveNum,
	Scale,
	Waveform,
} from '@/types/keyboard-option-types';

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

const octaveOptions: OctaveNum[] = Array.from(
	{ length: 6 },
	(_, index) => (index + 1) as OctaveNum
);

const waveformOptions: Waveform[] = ['sine', 'sawtooth', 'triangle', 'square'];

const scaleOptions: Scale[] = [
	'chromatic',
	'major',
	'natural minor',
	'harmonic minor',
	'melodic minor',
	'major pentatonic',
	'minor pentatonic',
	'blues',
];

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
	scale: {
		options: scaleOptions,
		ariaLabel: 'Select a scale',
		title: 'Scale',
		name: 'scale',
	},
};

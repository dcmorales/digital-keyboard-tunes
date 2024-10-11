// settingsOptions
// Defines options for keyboard-settings.
// Each object in settingsOptions represents a dropdown within the settings.
// The object provides all props except for those provided by the React context.

import type {
	NoteKey,
	NoteLength,
	OctaveNum,
	Order,
	Scale,
	TotalNotesNum,
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

// 1-6
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

const orderOptions: Order[] = ['ascending', 'descending', 'random'];

const noteLengthOptions: NoteLength[] = ['1/4', '1/8', '1/16'];

// 100-130
const bpmOptions: number[] = Array.from(
	{ length: 31 },
	(_, index) => 100 + index
);

// total number of notes in default (chromatic) scale
const totalNotesOptions: TotalNotesNum[] = Array.from(
	{ length: 13 },
	(_, index) => (13 - index) as TotalNotesNum
);

// 0-8
const repeatNumOptions: number[] = Array.from(
	{ length: 9 },
	(_, index) => index
);

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
	order: {
		options: orderOptions,
		ariaLabel: 'Select an order',
		title: 'Order',
		name: 'order',
	},
	noteLength: {
		options: noteLengthOptions,
		ariaLabel: 'Select a note length',
		title: 'Note Length',
		name: 'note-length',
	},
	bpm: {
		options: bpmOptions,
		ariaLabel: 'Select a beats per minute value',
		title: 'BPM',
		name: 'bpm',
	},
	totalNotes: {
		options: totalNotesOptions,
		ariaLabel: 'Select a number of total notes',
		title: 'Total Notes',
		name: 'total-notes',
	},
	repeatNum: {
		options: repeatNumOptions,
		ariaLabel: 'Select the number of times to repeat the scale',
		title: 'Repeat',
		name: 'repeat-num',
	},
};

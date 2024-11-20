// settings-options
// Defines options for keyboard-settings.
// Each object in settingsOptions represents a dropdown within the settings.
// The object provides all props except for those provided by the React context.

import { TooltipDefault as Tooltip } from '@/components/common/tooltip';
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

const waveformOptions: Waveform[] = ['sine', 'square', 'sawtooth', 'triangle'];

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

// number of notes in default (chromatic) scale in descending order
const totalNotesOptions: TotalNotesNum[] = Array.from(
	{ length: 13 },
	(_, index) => (13 - index) as TotalNotesNum
);

// 0-8
const repeatNumOptions: number[] = Array.from(
	{ length: 9 },
	(_, index) => index
);

interface SettingOption<T> {
	options: T[];
	ariaLabel: string;
	title: string;
	name: string;
	tooltip: Tooltip;
}

type SettingsOptions = {
	key: SettingOption<NoteKey>;
	octave: SettingOption<OctaveNum>;
	waveform: SettingOption<Waveform>;
	scale: SettingOption<Scale>;
	order: SettingOption<Order>;
	noteLength: SettingOption<NoteLength>;
	bpm: SettingOption<number>;
	totalNotes: SettingOption<TotalNotesNum>;
	repeatNum: SettingOption<number>;
};

export const settingsOptions: SettingsOptions = {
	key: {
		options: noteOptions,
		ariaLabel: 'Select a key',
		title: 'Key',
		name: 'key',
		tooltip: {
			topic: 'Key setting',
			text: 'Sets the first key to start the scale with. For more details, visit the About page.',
		},
	},
	octave: {
		options: octaveOptions,
		ariaLabel: 'Select an octave',
		title: 'Octave',
		name: 'octave',
		tooltip: {
			topic: 'Octave setting',
			text: 'Determines which 13 keys will be displayed below the full keyboard. For more details, visit the About page.',
		},
	},
	waveform: {
		options: waveformOptions,
		ariaLabel: 'Select a waveform',
		title: 'Waveform',
		name: 'waveform',
		tooltip: {
			topic: 'Waveform setting',
			text: 'The shape of the oscillator wave, determines the sound. For more details, visit the About page.',
		},
	},
	scale: {
		options: scaleOptions,
		ariaLabel: 'Select a scale',
		title: 'Scale',
		name: 'scale',
		tooltip: {
			topic: 'Scale setting',
			text: 'Determines the notes to play based on the musical scale selected. For more details, visit the About page.',
		},
	},
	order: {
		options: orderOptions,
		ariaLabel: 'Select an order',
		title: 'Order',
		name: 'order',
		tooltip: {
			topic: 'Order setting',
			text: 'The order which the notes will play in. For more details, visit the About page.',
		},
	},
	noteLength: {
		options: noteLengthOptions,
		ariaLabel: 'Select a note length',
		title: 'Note Length',
		name: 'note-length',
		tooltip: {
			topic: 'Note Length setting',
			text: 'The duration the note will play for in relation to BPM. For more details, visit the About page.',
		},
	},
	bpm: {
		options: bpmOptions,
		ariaLabel: 'Select a beats per minute value',
		title: 'BPM',
		name: 'bpm',
		tooltip: {
			topic: 'BPM setting',
			text: 'Beats Per Minute: the number of beats, in quarter notes, per minute. For more details, visit the About page.',
		},
	},
	totalNotes: {
		options: totalNotesOptions,
		ariaLabel: 'Select a number of total notes',
		title: 'Total Notes',
		name: 'total-notes',
		tooltip: {
			topic: 'Total Notes setting',
			text: 'Total number of unique notes from the scale to play. For more details, visit the About page.',
		},
	},
	repeatNum: {
		options: repeatNumOptions,
		ariaLabel: 'Select the number of times to repeat the scale',
		title: 'Repeat',
		name: 'repeat-num',
		tooltip: {
			topic: 'Repeat setting',
			text: 'Number of times to repeat the selected notes. For more details, visit the About page.',
		},
	},
};

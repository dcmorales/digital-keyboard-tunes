export const noteOptions = [
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
};

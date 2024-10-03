// keyboard-option-types
// Types defining specific values for common keyboard options

export type NoteKey =
	| 'C'
	| 'D♭'
	| 'D'
	| 'E♭'
	| 'E'
	| 'F'
	| 'G♭'
	| 'G'
	| 'A♭'
	| 'A'
	| 'B♭'
	| 'B';

export type OctaveNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Waveform = 'sine' | 'square' | 'triangle' | 'sawtooth';

export type Scale = 'chromatic' | 'major';

export type FullNote = `${NoteKey}${OctaveNum}`;

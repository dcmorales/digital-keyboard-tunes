// keyboard-option-types
// Strict type definitions for common keyboard options

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

export type FullNote = `${NoteKey}${OctaveNum}`;

export type Waveform = 'sine' | 'square' | 'triangle' | 'sawtooth';

export type Scale =
	| 'chromatic'
	| 'major'
	| 'natural minor'
	| 'harmonic minor'
	| 'melodic minor'
	| 'major pentatonic'
	| 'minor pentatonic'
	| 'blues';

export type Order = 'ascending' | 'descending' | 'random';

export type NoteLength = '1/4' | '1/8' | '1/16';

// scale-note-utils

import type {
	FullNote,
	NoteKey,
	OctaveNum,
	Order,
	Scale,
	TotalNotesNum,
} from '@/types/keyboard-option-types';
import { noteOptions } from '@/values/settingsOptions';

// Create a new array starting at the selectedKey. Add the selectedOctave to each string to create a fullNote.
// Any note that was originally before the selectedKey will be placed at the end of the new array.
// The octave will also increase for these notes.
// End the array with the first key of the next octave.
export function rearrangeNotes(
	selectedKey: NoteKey,
	selectedOctave: OctaveNum
): FullNote[] {
	const startIndex = noteOptions.indexOf(selectedKey);
	const firstSegment = noteOptions
		.slice(startIndex)
		.map((note) => note + selectedOctave) as FullNote[];
	const secondSegment = noteOptions
		.slice(0, startIndex)
		.map((note) => note + (selectedOctave + 1)) as FullNote[];
	const endNote = (selectedKey + (selectedOctave + 1)) as FullNote;

	return firstSegment.concat(secondSegment, endNote);
}

// using the selected scale, key, and octave, follow the provided array pattern
// to return only the notes that are included in that scale
export function defineScaleNotes(
	selectedKey: NoteKey,
	selectedOctave: OctaveNum,
	selectedScale: Scale
): FullNote[] {
	const fullNotesOctave = rearrangeNotes(selectedKey, selectedOctave);

	let scaleNoteIndexes: number[];

	switch (selectedScale) {
		case 'chromatic':
			scaleNoteIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			break;
		case 'major':
			scaleNoteIndexes = [0, 2, 4, 5, 7, 9, 11, 12];
			break;
		case 'natural minor':
			scaleNoteIndexes = [0, 2, 3, 5, 7, 8, 10, 12];
			break;
		case 'harmonic minor':
			scaleNoteIndexes = [0, 2, 3, 5, 7, 8, 11, 12];
			break;
		case 'melodic minor':
			scaleNoteIndexes = [0, 2, 3, 5, 7, 9, 11, 12];
			break;
		case 'major pentatonic':
			scaleNoteIndexes = [0, 2, 4, 7, 9, 12];
			break;
		case 'minor pentatonic':
			scaleNoteIndexes = [0, 3, 5, 7, 10, 12];
			break;
		case 'blues':
			scaleNoteIndexes = [0, 3, 5, 6, 7, 10, 12];
			break;
	}

	return scaleNoteIndexes.map((index) => fullNotesOctave[index]);
}

// Fisher-Yates shuffle
function shuffleNotes(notes: FullNote[]): FullNote[] {
	for (let i = notes.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[notes[i], notes[j]] = [notes[j], notes[i]];
	}
	return notes;
}

export function setNotesOrder(
	selectedKey: NoteKey,
	selectedOctave: OctaveNum,
	selectedScale: Scale,
	selectedOrder: Order
): FullNote[] {
	const scaleNotes = defineScaleNotes(
		selectedKey,
		selectedOctave,
		selectedScale
	);

	switch (selectedOrder) {
		case 'ascending':
			return scaleNotes;
		case 'descending':
			return scaleNotes.reverse();
		case 'random':
			return shuffleNotes(scaleNotes);
	}
}

export function getAllNotes(
	orderedScaleNotes: FullNote[],
	totalNotesNum: TotalNotesNum,
	repeatNum: number
): FullNote[] {
	const totalNotes = orderedScaleNotes.slice(0, totalNotesNum);

	return Array.from({ length: repeatNum + 1 }, () => totalNotes).flat();
}

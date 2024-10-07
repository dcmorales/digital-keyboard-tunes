import { describe, expect, it } from 'vitest';

import {
	defineScaleNotes,
	rearrangeNotes,
	setNotesOrder,
} from './scale-note-utils';
import { Scale } from '@/types/keyboard-option-types';

const mockNotes = [
	'D5',
	'E♭5',
	'E5',
	'F5',
	'G♭5',
	'G5',
	'A♭5',
	'A5',
	'B♭5',
	'B5',
	'C6',
	'D♭6',
	'D6',
];
const mockSelectedKey = 'D';
const mockSelectedOctave = 5;
const mockSelectedScale = 'major';

describe('Scale Note Utils', () => {
	it('rearranges notes correctly', () => {
		const result = rearrangeNotes(mockSelectedKey, mockSelectedOctave);

		expect(result).toEqual(mockNotes);
	});

	it('defines the correct set of selected notes based on octave, key, and scale', () => {
		const scaleTests = [
			{
				scale: 'chromatic',
				expected: [
					'D5',
					'E♭5',
					'E5',
					'F5',
					'G♭5',
					'G5',
					'A♭5',
					'A5',
					'B♭5',
					'B5',
					'C6',
					'D♭6',
					'D6',
				],
			},
			{
				scale: 'major',
				expected: ['D5', 'E5', 'G♭5', 'G5', 'A5', 'B5', 'D♭6', 'D6'],
			},
			{
				scale: 'natural minor',
				expected: ['D5', 'E5', 'F5', 'G5', 'A5', 'B♭5', 'C6', 'D6'],
			},
			{
				scale: 'harmonic minor',
				expected: ['D5', 'E5', 'F5', 'G5', 'A5', 'B♭5', 'D♭6', 'D6'],
			},
			{
				scale: 'melodic minor',
				expected: ['D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'D♭6', 'D6'],
			},
			{
				scale: 'major pentatonic',
				expected: ['D5', 'E5', 'G♭5', 'A5', 'B5', 'D6'],
			},
			{
				scale: 'minor pentatonic',
				expected: ['D5', 'F5', 'G5', 'A5', 'C6', 'D6'],
			},
			{ scale: 'blues', expected: ['D5', 'F5', 'G5', 'A♭5', 'A5', 'C6', 'D6'] },
		];

		scaleTests.forEach(({ scale, expected }) => {
			const result = defineScaleNotes(
				mockSelectedKey,
				mockSelectedOctave,
				scale as Scale
			);
			expect(result).toStrictEqual(expected);
		});
	});

	it('correctly assembles notes using the ascending order', () => {
		const ascendingOrder = setNotesOrder(
			mockSelectedKey,
			mockSelectedOctave,
			mockSelectedScale,
			'ascending'
		);
		const ascendingExpectedResult = [
			'D5',
			'E5',
			'G♭5',
			'G5',
			'A5',
			'B5',
			'D♭6',
			'D6',
		];

		expect(ascendingOrder).toStrictEqual(ascendingExpectedResult);
	});

	it('correctly assembles notes using the descending order', () => {
		const descendingOrder = setNotesOrder(
			mockSelectedKey,
			mockSelectedOctave,
			mockSelectedScale,
			'descending'
		);
		const descendingExpectedResult = [
			'D6',
			'D♭6',
			'B5',
			'A5',
			'G5',
			'G♭5',
			'E5',
			'D5',
		];

		expect(descendingOrder).toStrictEqual(descendingExpectedResult);
	});
});

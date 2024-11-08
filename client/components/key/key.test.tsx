import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ContextTestComponent from '@/mocks/context-test-component';
import { fadeOutNote, playNote } from '@/utils/audio-utils';
import Key from '.';

vi.mock('@/utils/audio-utils', () => ({
	fadeOutNote: vi.fn(),
	playNote: vi.fn(),
}));

const mockNote = 'C4';
const mockWaveform = 'sine';

describe('Key', () => {
	let naturalNoteButton: HTMLButtonElement;

	beforeEach(() => {
		render(
			// ContextTestComponent makes easy state updates in tests possible
			<KeyboardOptionsProvider>
				<Key note={mockNote} isSelectedKeyboard />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);
		naturalNoteButton = screen.getByRole('button', {
			name: /Play the C4 note/i,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders a button with the correct aria label', () => {
		// label defined in beforeEach hook
		expect(naturalNoteButton).toBeInTheDocument();
	});

	it('applies the correct class name for natural notes', () => {
		expect(naturalNoteButton.className.includes('white')).toBe(true);
	});

	it('applies the correct class name for flat notes', () => {
		render(
			<KeyboardOptionsProvider>
				<Key note="D♭4" isSelectedKeyboard />
			</KeyboardOptionsProvider>
		);
		const flatNoteButton = screen.getByRole('button', {
			name: /Play the D♭4 note/i,
		});

		expect(flatNoteButton.className.includes('black')).toBe(true);
	});

	it('plays the note on mouse down event', () => {
		fireEvent.mouseDown(naturalNoteButton);

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(naturalNoteButton.className.includes('active')).toBe(true);
	});

	it('stops the note on mouse up event', () => {
		fireEvent.mouseUp(naturalNoteButton);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(naturalNoteButton.className.includes('active')).toBe(false);
	});

	it('plays the note on enter key down event', () => {
		fireEvent.keyDown(naturalNoteButton, { key: 'Enter' });

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(naturalNoteButton.className.includes('active')).toBe(true);
	});

	it('plays the note on space key down event', () => {
		fireEvent.keyDown(naturalNoteButton, { key: ' ' });

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(naturalNoteButton.className.includes('active')).toBe(true);
	});

	it('does not play the note on key down event with keys other than Enter or Space', () => {
		const otherKeys = ['Tab', 'ArrowUp', 'ArrowDown', 'Esc', ' a'];
		otherKeys.forEach((key) => {
			fireEvent.keyDown(naturalNoteButton, { key });

			expect(playNote).not.toHaveBeenCalled();
			expect(naturalNoteButton.className.includes('active')).toBe(false);
		});
	});

	it('stops the note on key up event', () => {
		fireEvent.keyUp(naturalNoteButton);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(naturalNoteButton.className.includes('active')).toBe(false);
	});

	it('plays the note on touch start event', () => {
		fireEvent.touchStart(naturalNoteButton);

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(naturalNoteButton.className.includes('active')).toBe(true);
	});

	it('stops the note on touch end event', () => {
		fireEvent.touchEnd(naturalNoteButton);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(naturalNoteButton.className.includes('active')).toBe(false);
	});

	it('is disabled when isPlaying is true and enabled otherwise', () => {
		// change isPlaying to true using test component
		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to true/i })
		);
		expect(naturalNoteButton).toBeDisabled();

		// change isPlaying to false using test component
		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to false/i })
		);
		expect(naturalNoteButton).not.toBeDisabled();
	});
});

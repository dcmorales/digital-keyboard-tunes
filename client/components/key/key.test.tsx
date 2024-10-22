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

const mockNote = 'D♭4';
const mockWaveform = 'sine';

describe('Key', () => {
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Key note={mockNote} isSelectedKeyboard />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);
		button = screen.getByRole('button', { name: /Play the D♭4 note/i });
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders a button with the correct aria label', () => {
		expect(button).toBeInTheDocument();
	});

	it('applies the correct class name', () => {
		expect(button.className.includes('black')).toBe(true);
	});

	it('plays the note on mouse down event', () => {
		fireEvent.mouseDown(button);

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(button.className.includes('active')).toBe(true);
	});

	it('stops the note on mouse up event', () => {
		fireEvent.mouseUp(button);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('plays the note on enter key down event', () => {
		fireEvent.keyDown(button, { key: 'Enter' });

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(button.className.includes('active')).toBe(true);
	});

	it('plays the note on space key down event', () => {
		fireEvent.keyDown(button, { key: ' ' });

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(button.className.includes('active')).toBe(true);
	});

	it('does not play the note on key down event with keys other than Enter or Space', () => {
		const otherKey = 'a';
		fireEvent.keyDown(button, { key: otherKey });

		expect(playNote).not.toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('stops the note on key up event', () => {
		fireEvent.keyUp(button);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('plays the note on touch start event', () => {
		fireEvent.touchStart(button);

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(button.className.includes('active')).toBe(true);
	});

	it('stops the note on touch end event', () => {
		fireEvent.touchEnd(button);

		expect(fadeOutNote).toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('is disabled when isPlaying is true and enabled otherwise', () => {
		const noteKey = screen.getByRole('button', {
			name: /Play the D♭4 note/i,
		});

		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to true/i })
		);
		expect(noteKey).toBeDisabled();

		fireEvent.click(
			screen.getByRole('button', { name: /Set isPlaying to false/i })
		);
		expect(noteKey).not.toBeDisabled();
	});
});

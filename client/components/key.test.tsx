import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { playNote, stopNote } from '@/utils/audio-functions';
import Key from './key';

vi.mock('@/utils/audio-functions', () => ({
	playNote: vi.fn(),
	stopNote: vi.fn(),
}));

describe('Key', () => {
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(<Key note="C4" />);
		button = screen.getByRole('button', { name: 'Play the C4 note' });
	});

	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	it('renders a button with the correct aria label', () => {
		expect(button).toBeDefined();
	});

	it('applies the correct class name', () => {
		expect(button.classList.contains('key--white')).toBe(true);
	});

	it('plays the note on mouse down event', () => {
		fireEvent.mouseDown(button);

		expect(playNote).toHaveBeenCalledWith('C4');
	});

	it('stops the note on mouse up event', () => {
		fireEvent.mouseUp(button);

		expect(stopNote).toHaveBeenCalled();
	});

	it('plays the note on touch start event', () => {
		fireEvent.touchStart(button);

		expect(playNote).toHaveBeenCalledWith('C4');
	});

	it('stops the note on touch end event', () => {
		fireEvent.touchEnd(button);

		expect(stopNote).toHaveBeenCalled();
	});
});

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import { playNote, stopNote } from '@/utils/audio-functions';
import Key from './key';

vi.mock('@/utils/audio-functions', () => ({
	playNote: vi.fn(),
	stopNote: vi.fn(),
}));

describe('Key', () => {
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Key note="C4" />
			</KeyboardOptionsProvider>
		);
		button = screen.getByRole('button', { name: 'Play the C4 note' });
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders a button with the correct aria label', () => {
		expect(button).toBeInTheDocument();
	});

	it('applies the correct class name', () => {
		expect(button).toHaveClass('key--white');
	});

	it('plays the note on mouse down event', () => {
		fireEvent.mouseDown(button);

		expect(playNote).toHaveBeenCalledWith('C4', 'sine');
	});

	it('stops the note on mouse up event', () => {
		fireEvent.mouseUp(button);

		expect(stopNote).toHaveBeenCalled();
	});

	it('plays the note on touch start event', () => {
		fireEvent.touchStart(button);

		expect(playNote).toHaveBeenCalledWith('C4', 'sine');
	});

	it('stops the note on touch end event', () => {
		fireEvent.touchEnd(button);

		expect(stopNote).toHaveBeenCalled();
	});
});

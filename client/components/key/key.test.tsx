import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
	KeyboardOptionsProvider,
	useKeyboardOptions,
} from '@/context/keyboard-options-context';
import { playNote, stopNote } from '@/utils/audio-utils';
import Key from '.';

vi.mock('@/utils/audio-utils', () => ({
	playNote: vi.fn(),
	stopNote: vi.fn(),
}));

const mockNote = 'D♭4';
const mockWaveform = 'sine';

function MockIsPlayingButton({ value }: { value: boolean }): JSX.Element {
	const { setIsPlaying } = useKeyboardOptions();

	return (
		<button onClick={() => setIsPlaying(value)}>
			Set isPlaying to {value ? 'true' : 'false'}
		</button>
	);
}

describe('Key', () => {
	let button: HTMLButtonElement;

	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<Key note={mockNote} isSelectedKeyboard />
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

		expect(stopNote).toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('plays the note on touch start event', () => {
		fireEvent.touchStart(button);

		expect(playNote).toHaveBeenCalledWith(mockNote, mockWaveform);
		expect(button.className.includes('active')).toBe(true);
	});

	it('stops the note on touch end event', () => {
		fireEvent.touchEnd(button);

		expect(stopNote).toHaveBeenCalled();
		expect(button.className.includes('active')).toBe(false);
	});

	it('is disabled when isPlaying is true and enabled otherwise', () => {
		render(
			<KeyboardOptionsProvider>
				<Key note="D4" isSelectedKeyboard />
				<MockIsPlayingButton value={true} />
				<MockIsPlayingButton value={false} />
			</KeyboardOptionsProvider>
		);

		const noteKey = screen.getByRole('button', {
			name: /Play the D4 note/i,
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

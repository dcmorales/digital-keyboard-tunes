import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import KeyboardSelected from '.';

describe('Selected Keyboard', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<KeyboardSelected />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the selected keyboard', () => {
		const keyboardSelected = screen.getByRole('region', {
			name: /Selected Keyboard: audio controls and keys/i,
		});

		expect(keyboardSelected).toBeInTheDocument();
	});

	it('renders the audio controls div', () => {
		const audioControls = screen.getByRole('group', {
			name: /Audio controls/i,
		});

		expect(audioControls).toBeInTheDocument();
	});

	it('renders the default octave beginning with the default key', () => {
		const octave = screen.getByRole('group', {
			name: /Octave for C4/i,
		});

		expect(octave).toBeInTheDocument();
	});

	it('does not render NotesDisplay when lastPlayedNotes is empty', () => {
		const notesDisplay = screen.queryByRole('region', {
			name: /Notes played:/i,
		});

		expect(notesDisplay).not.toBeInTheDocument();
	});

	it('renders NotesDisplay when lastPlayedNotes has values', () => {
		// add values to lastPlayNotes by playing initial notes
		vi.useFakeTimers();
		const playButton = screen.getByRole('button', { name: /Play the scale/i });
		fireEvent.click(playButton);

		const notesDisplay = screen.getByRole('region', {
			name: /Notes played:/i,
		});

		expect(notesDisplay).toBeInTheDocument();

		vi.useRealTimers();
	});
});

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { KeyboardOptionsProvider } from '@/context/keyboard-options-context';
import ContextTestComponent from '@/mocks/context-test-component';
import type { FullNote } from '@/types/keyboard-option-types';
import NotesDisplay from '.';

const mockNotes = ['C4', 'D♭4', 'E4', 'C4', 'D♭4', 'E4'] as FullNote[];

describe('Notes Display', () => {
	beforeEach(() => {
		render(
			<KeyboardOptionsProvider>
				<NotesDisplay lastPlayedNotes={mockNotes} />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);
	});

	it('renders the notes display section', () => {
		const notesDisplay = screen.getByRole('region', { name: /Notes played:/i });

		expect(notesDisplay).toBeInTheDocument();
	});

	it('displays only the unique notes', () => {
		const repeatNumDropdown = screen.getByRole('combobox', {
			name: /Select repeat-num/i,
		});
		fireEvent.change(repeatNumDropdown, { target: { value: '2' } });

		const section = screen.getByRole('region', { name: /Notes played:/i });
		const sectionSpans = section.querySelectorAll('span');
		const notesArray = (note: FullNote) => {
			return Array.from(sectionSpans).filter((span) => {
				const trimmedText = span.textContent!.replace(/\s*-\s*/g, '').trim(); // trim for flat symbol
				return trimmedText === note;
			});
		};

		expect(sectionSpans.length).toBe(5); // 3 from notes, 1 from flat note, 1 from flat symbol
		expect(notesArray('C4').length).toBe(1);
		expect(notesArray('D♭4').length).toBe(2); // 1 from flat note container, 1 from flat symbol
		expect(notesArray('E4').length).toBe(1);
	});

	it('displays the correct play number after updating lastPlayedNotes', () => {
		cleanup();
		const { rerender } = render(
			<KeyboardOptionsProvider>
				<NotesDisplay lastPlayedNotes={mockNotes} />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);

		const section = screen.getByRole('region', { name: /Notes played:/i });

		expect(section).toHaveTextContent('x 1');

		// change repeat number
		const repeatNumDropdown = screen.getByRole('combobox', {
			name: /Select repeat-num/i,
		});
		fireEvent.change(repeatNumDropdown, { target: { value: '2' } });

		// update lastPlayedNotes
		const updatedNotes = ['C4', 'D♭4', 'E4', 'F4'] as FullNote[];
		rerender(
			<KeyboardOptionsProvider>
				<NotesDisplay lastPlayedNotes={updatedNotes} />
				<ContextTestComponent />
			</KeyboardOptionsProvider>
		);

		expect(section).toHaveTextContent('x 3');
	});
});

// keyboard-options-context
// Provides global state to the client. Manages the selection change
// in the keyboard-settings using a selection handler. This updated state affects
// the sounds played as well as the keys that show up in keyboard-selected.
// Based on the selections made, the context will also provide all notes in the
// selected octave as well as the notes belonging to the selected scale.
// The activeNote updates whenever a key is pressed or when the play button
// plays a series of notes. This will update the styles of the key at that note.

'use client';

import {
	type ChangeEvent,
	type ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

import type {
	FullNote,
	NoteKey,
	OctaveNum,
	Order,
	Waveform,
	Scale,
} from '@/types/keyboard-option-types';
import { defineScaleNotes, rearrangeNotes } from '@/utils/scale-note-utils';

interface KeyboardOptionsContextType {
	selectedKey: NoteKey;
	onKeyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedOctave: OctaveNum;
	onOctaveChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedWaveform: Waveform;
	onWaveformChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedScale: Scale;
	onScaleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedOrder: Order;
	onOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	activeNote: FullNote | null;
	setActiveNote: (note: FullNote | null) => void;
	fullNotesOctave: FullNote[];
	selectedScaleNotes: FullNote[];
}

const KeyboardOptionsContext = createContext<
	KeyboardOptionsContextType | undefined
>(undefined);

type SelectionName = 'key' | 'octave' | 'waveform' | 'scale' | 'order';

interface KeyboardOptionsProviderProps {
	children: ReactNode;
}

export const KeyboardOptionsProvider = ({
	children,
}: KeyboardOptionsProviderProps) => {
	const [selectedKey, setSelectedKey] = useState<NoteKey>('C');
	const [selectedOctave, setSelectedOctave] = useState<OctaveNum>(4);
	const [selectedWaveform, setSelectedWaveform] = useState<Waveform>('sine');
	const [selectedScale, setSelectedScale] = useState<Scale>('chromatic');
	const [selectedOrder, setSelectedOrder] = useState<Order>('ascending');
	const [activeNote, setActiveNote] = useState<FullNote | null>(null);

	const selectionHandlers: Record<SelectionName, (value: string) => void> = {
		key: (value: string) => setSelectedKey(value as NoteKey),
		octave: (value: string) => setSelectedOctave(Number(value) as OctaveNum),
		waveform: (value: string) => setSelectedWaveform(value as Waveform),
		scale: (value: string) => setSelectedScale(value as Scale),
		order: (value: string) => setSelectedOrder(value as Order),
	};

	const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		const selectionHandler = selectionHandlers[name as SelectionName];

		selectionHandler(value);
	};

	const fullNotesOctave = rearrangeNotes(selectedKey, selectedOctave);

	const selectedScaleNotes = defineScaleNotes(
		selectedKey,
		selectedOctave,
		selectedScale
	);

	return (
		<KeyboardOptionsContext.Provider
			value={{
				selectedKey,
				onKeyChange: onSelectionChange,
				selectedOctave,
				onOctaveChange: onSelectionChange,
				selectedWaveform,
				onWaveformChange: onSelectionChange,
				selectedScale,
				onScaleChange: onSelectionChange,
				selectedOrder,
				onOrderChange: onSelectionChange,
				activeNote,
				setActiveNote,
				fullNotesOctave,
				selectedScaleNotes,
			}}
		>
			{children}
		</KeyboardOptionsContext.Provider>
	);
};

// custom hook to use the KeyboardOptionsContext
export const useKeyboardOptions = (): KeyboardOptionsContextType => {
	const context = useContext(KeyboardOptionsContext);

	if (!context) {
		throw new Error(
			'useKeyboardOptions must be used within a KeyboardOptionsProvider'
		);
	}
	return context;
};

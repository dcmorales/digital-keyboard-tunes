// keyboard-options-context
// Provides global state to the client. Manages the selection change
// in the keyboard-settings using a selection handler. This updated state affects
// the sounds played as well as the keys that show up in keyboard-selected.
// Based on the selections made, the context will also provide all notes belonging to
// the selected scale in the selected order. Other items such as activeNote (for key styles)
// and isPlaying (for disabling elements) are also provided.

'use client';

import {
	type ChangeEvent,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

import type {
	FullNote,
	NoteKey,
	NoteLength,
	OctaveNum,
	Order,
	TotalNotesNum,
	Waveform,
	Scale,
} from '@/types/keyboard-option-types';
import { setNotesOrder } from '@/utils/scale-note-utils';

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
	selectedNoteLength: NoteLength;
	onNoteLengthChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedBpm: number;
	onBpmChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedTotalNotes: TotalNotesNum;
	onTotalNotesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedRepeatNum: number;
	onRepeatNumChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	activeNote: FullNote | null;
	setActiveNote: Dispatch<SetStateAction<FullNote | null>>;
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
	orderedScaleNotes: FullNote[];
}

const KeyboardOptionsContext = createContext<
	KeyboardOptionsContextType | undefined
>(undefined);

type SelectionName =
	| 'key'
	| 'octave'
	| 'waveform'
	| 'scale'
	| 'order'
	| 'note-length'
	| 'bpm'
	| 'total-notes'
	| 'repeat-num';

interface KeyboardOptionsProviderProps {
	children: ReactNode;
}

export const KeyboardOptionsProvider = ({
	children,
}: KeyboardOptionsProviderProps) => {
	// state updates through dropdowns
	const [selectedKey, setSelectedKey] = useState<NoteKey>('C');
	const [selectedOctave, setSelectedOctave] = useState<OctaveNum>(4);
	const [selectedWaveform, setSelectedWaveform] = useState<Waveform>('sine');
	const [selectedScale, setSelectedScale] = useState<Scale>('chromatic');
	const [selectedOrder, setSelectedOrder] = useState<Order>('ascending');
	const [selectedNoteLength, setSelectedNoteLength] =
		useState<NoteLength>('1/4');
	const [selectedBpm, setSelectedBpm] = useState<number>(100);
	const [selectedTotalNotes, setSelectedTotalNotes] =
		useState<TotalNotesNum>(13);
	const [selectedRepeatNum, setSelectedRepeatNum] = useState<number>(0);

	// the activeNote updates whenever a key is pressed or when the play button
	// plays a series of notes; this will update the styles of the key at that note
	const [activeNote, setActiveNote] = useState<FullNote | null>(null);
	// if isPlaying is true, dropdowns and keys will be disabled
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const orderedScaleNotes: FullNote[] = setNotesOrder(
		selectedKey,
		selectedOctave,
		selectedScale,
		selectedOrder
	);

	// an object that maps different selection names to corresponding handler functions;
	// the handler functions update a specific piece of state with the value provided
	const selectionHandlers: Record<SelectionName, (value: string) => void> = {
		key: (value: string) => setSelectedKey(value as NoteKey),
		octave: (value: string) => setSelectedOctave(Number(value) as OctaveNum),
		waveform: (value: string) => setSelectedWaveform(value as Waveform),
		scale: (value: string) => setSelectedScale(value as Scale),
		order: (value: string) => setSelectedOrder(value as Order),
		'note-length': (value: string) =>
			setSelectedNoteLength(value as NoteLength),
		bpm: (value: string) => setSelectedBpm(Number(value)),
		'total-notes': (value: string) =>
			setSelectedTotalNotes(Number(value) as TotalNotesNum),
		'repeat-num': (value: string) => setSelectedRepeatNum(Number(value)),
	};

	// an event handler to find the appropriate selectionHandler based on name,
	// then calls that handler with the selected value
	const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		const selectionHandler = selectionHandlers[name as SelectionName];

		selectionHandler(value);
	};

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
				selectedNoteLength,
				onNoteLengthChange: onSelectionChange,
				selectedBpm,
				onBpmChange: onSelectionChange,
				selectedTotalNotes,
				onTotalNotesChange: onSelectionChange,
				selectedRepeatNum,
				onRepeatNumChange: onSelectionChange,
				activeNote,
				setActiveNote,
				isPlaying,
				setIsPlaying,
				orderedScaleNotes,
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

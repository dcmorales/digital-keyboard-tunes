// keyboard-options-context
// Provides global state to the client.
// The state provided here is updated through the keyboard-settings
// The updated state affects the sounds played as well as the keys that
// show up in keyboard-selected.

'use client';

import {
	type ChangeEvent,
	type ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

import {
	NoteKey,
	OctaveNum,
	Waveform,
	Scale,
} from '@/types/keyboard-option-types';

interface KeyboardOptionsContextType {
	selectedKey: NoteKey;
	onKeyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedOctave: OctaveNum;
	onOctaveChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedWaveform: Waveform;
	onWaveformChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedScale: Scale;
	onScaleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const KeyboardOptionsContext = createContext<
	KeyboardOptionsContextType | undefined
>(undefined);

type SelectionName = 'key' | 'octave' | 'waveform' | 'scale';

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

	const selectionHandlers: Record<SelectionName, (value: string) => void> = {
		key: (value: string) => setSelectedKey(value as NoteKey),
		octave: (value: string) => setSelectedOctave(Number(value) as OctaveNum),
		waveform: (value: string) => setSelectedWaveform(value as Waveform),
		scale: (value: string) => setSelectedScale(value as Scale),
	};

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

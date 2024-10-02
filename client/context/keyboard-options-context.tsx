// keyboard-options-context

'use client';

import {
	type ChangeEvent,
	type ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';

interface KeyboardOptionsContextType {
	selectedKey: string;
	onKeyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedOctave: number;
	onOctaveChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedWaveform: string;
	onWaveformChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const KeyboardOptionsContext = createContext<
	KeyboardOptionsContextType | undefined
>(undefined);

type SelectionName = 'key' | 'octave' | 'waveform';

interface KeyboardOptionsProviderProps {
	children: ReactNode;
}

export const KeyboardOptionsProvider = ({
	children,
}: KeyboardOptionsProviderProps) => {
	const [selectedKey, setSelectedKey] = useState<string>('C');
	const [selectedOctave, setSelectedOctave] = useState<number>(4);
	const [selectedWaveform, setSelectedWaveform] = useState<string>('sine');

	const selectionHandlers: Record<SelectionName, (value: string) => void> = {
		key: setSelectedKey,
		octave: (value: string) => setSelectedOctave(Number(value)),
		waveform: setSelectedWaveform,
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

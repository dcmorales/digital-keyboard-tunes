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
}

const KeyboardOptionsContext = createContext<
	KeyboardOptionsContextType | undefined
>(undefined);

interface KeyboardOptionsProviderProps {
	children: ReactNode;
}

export const KeyboardOptionsProvider = ({
	children,
}: KeyboardOptionsProviderProps) => {
	const [selectedKey, setSelectedKey] = useState<string>('C');

	const onKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;

		setSelectedKey(value);
	};

	return (
		<KeyboardOptionsContext.Provider
			value={{
				selectedKey,
				onKeyChange,
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

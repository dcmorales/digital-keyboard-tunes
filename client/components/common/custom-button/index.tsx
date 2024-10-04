// custom-button
// A button component that must have an ariaLabel and onClick provided.
// It will display its children.

import type { ReactNode } from 'react';

interface CustomButtonProps {
	children: ReactNode;
	ariaLabel: string;
	onClick: () => void;
}

export default function CustomButton({
	children,
	ariaLabel,
	onClick,
}: CustomButtonProps): JSX.Element {
	return (
		<button className="custom-button" aria-label={ariaLabel} onClick={onClick}>
			{children}
		</button>
	);
}

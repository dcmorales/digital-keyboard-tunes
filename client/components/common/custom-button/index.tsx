// custom-button
// A button component that must have an ariaLabel and onClick provided.
// It displays its children. Since the event handler is not defined in the
// component itself, this component can only be added to client components.

import type { ReactNode } from 'react';

import styles from './custom-button.module.scss';

interface CustomButtonProps {
	children: ReactNode;
	ariaLabel: string;
	disabled?: boolean;
	onClick: () => void;
}

export default function CustomButton({
	children,
	ariaLabel,
	disabled,
	onClick,
}: CustomButtonProps): JSX.Element {
	return (
		<button
			className={styles.button}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

// custom-button
// A button component that must have an ariaLabel and onClick provided.
// It displays its children. Since the event handler is not defined in the
// component itself, this component can only be added to client components.

import type { KeyboardEvent, ReactNode } from 'react';

import styles from './custom-button.module.scss';

interface CustomButtonProps {
	children: ReactNode;
	className?: string;
	ariaLabel: string;
	disabled?: boolean;
	onClick: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export default function CustomButton({
	className,
	children,
	ariaLabel,
	disabled,
	onClick,
	onFocus,
	onBlur,
	onKeyDown,
}: CustomButtonProps): JSX.Element {
	return (
		<button
			className={`${styles.button} ${className ? className : ''}`}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={onClick}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
		>
			{children}
		</button>
	);
}

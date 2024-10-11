// custom-button
// A button component that must have an ariaLabel and onClick provided.
// It displays its children.

import type { ReactNode } from 'react';

import styles from './custom-button.module.scss';

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
		<button className={styles.button} aria-label={ariaLabel} onClick={onClick}>
			{children}
		</button>
	);
}

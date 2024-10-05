// scrollbar
// A wrapper component that makes its children scrollable

import type { ReactNode } from 'react';

import styles from './scrollbar.module.scss';

interface ScrollbarProps {
	children: ReactNode;
}

export default function Scrollbar({ children }: ScrollbarProps): JSX.Element {
	return (
		<div
			className={styles.scrollbar}
			role="scrollbar"
			aria-controls="scrollable-content"
			aria-valuenow={0}
			aria-label="Scrollable area"
			tabIndex={0}
		>
			<div id="scrollable-content">{children}</div>
		</div>
	);
}

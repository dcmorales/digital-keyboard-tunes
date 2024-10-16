// dropdown
// A dropdown menu. Displays a label and maps over the options provided.
// When the selection changes, the event handler is called and the select value is updated.
// A name is applied as a simple way to get the target element.

import type { ChangeEvent } from 'react';

import styles from './dropdown.module.scss';

interface DropdownProps {
	options: string[] | number[];
	ariaLabel: string;
	title: string;
	name: string;
	value: string | number;
	disabled?: boolean;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
	options,
	ariaLabel,
	title,
	name,
	value,
	disabled,
	onChange,
}: DropdownProps): JSX.Element {
	return (
		<div className={styles.dropdown}>
			<label className={styles.label} htmlFor={name}>
				{title}
			</label>

			<select
				className={styles.select}
				id={name}
				name={name}
				aria-label={ariaLabel}
				value={value}
				disabled={disabled}
				onChange={onChange}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

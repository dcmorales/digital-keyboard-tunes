// dropdown
// A dropdown menu. Displays a label and maps over the options provided.
// When the selection changes, the event handler is called and the select value is updated.
// A name is applied so that the handler in the context updates the correct state.

import type { ChangeEvent } from 'react';

import styles from './dropdown.module.scss';

interface DropdownProps {
	options: string[] | number[];
	ariaLabel: string;
	title: string;
	name: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
	options,
	ariaLabel,
	title,
	name,
	value,
	onChange,
}: DropdownProps): JSX.Element {
	return (
		<div className={styles.dropdown}>
			<label htmlFor={name}>{title}</label>

			<select
				id={name}
				name={name}
				aria-label={ariaLabel}
				value={value}
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

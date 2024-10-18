// dropdown
// A dropdown menu with an optional tooltip. Displays a label and maps over the options provided.
// When the selection changes, the event handler is called and the select value is updated.
// A name is applied as a simple way to get the target element. Since the event handler is
// not defined in the component itself, this component can only be added to client components.

import type { ChangeEvent } from 'react';

import Tooltip from '@/components/common/tooltip';
import styles from './dropdown.module.scss';

interface DropdownProps {
	options: string[] | number[];
	ariaLabel: string;
	title: string;
	name: string;
	value: string | number;
	disabled?: boolean;
	tooltip?: {
		text: string;
		topic: string;
	};
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
	options,
	ariaLabel,
	title,
	name,
	value,
	disabled,
	tooltip,
	onChange,
}: DropdownProps): JSX.Element {
	return (
		<div className={styles.dropdown}>
			<div className={styles.labelContainer}>
				<label className={styles.label} htmlFor={name}>
					{title}
				</label>

				{tooltip && <Tooltip topic={tooltip.topic} text={tooltip.text} />}
			</div>

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

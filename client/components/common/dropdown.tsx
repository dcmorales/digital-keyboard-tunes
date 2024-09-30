// dropdown

import type { ChangeEvent } from 'react';

interface DropdownProps {
	options: string[];
	ariaLabel: string;
	title: string;
	id: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
	options,
	ariaLabel,
	title,
	id,
	value,
	onChange,
}: DropdownProps): JSX.Element {
	return (
		<div className="dropdown">
			<label htmlFor={id}>{title}</label>

			<select id={id} aria-label={ariaLabel} value={value} onChange={onChange}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

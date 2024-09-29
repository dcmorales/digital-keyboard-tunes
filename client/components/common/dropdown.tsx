// dropdown

interface DropdownProps {
	options: string[];
	ariaLabel: string;
	title: string;
	id: string;
}

export default function Dropdown({
	options,
	ariaLabel,
	title,
	id,
}: DropdownProps): JSX.Element {
	return (
		<div>
			<label htmlFor={`${id}`}>{title}</label>

			<select id={`${id}`} aria-label={ariaLabel}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

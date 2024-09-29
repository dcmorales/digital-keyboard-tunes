// dropdown

interface DropdownProps {
	options: string[];
	ariaLabel: string;
}

export default function Dropdown({
	options,
	ariaLabel,
}: DropdownProps): JSX.Element {
	return (
		<select aria-label={ariaLabel}>
			{options.map((option) => {
				return (
					<option key={`${option}`} value={`${option}`}>
						{option}
					</option>
				);
			})}
		</select>
	);
}

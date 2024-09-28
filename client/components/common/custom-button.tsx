// custom-button

interface CustomButtonProps {
	children: React.ReactNode;
	ariaLabel: string;
	onClick: () => void;
}

export default function CustomButton({
	children,
	ariaLabel,
	onClick,
}: CustomButtonProps): JSX.Element {
	return (
		<button className="custom-button" aria-label={ariaLabel} onClick={onClick}>
			{children}
		</button>
	);
}

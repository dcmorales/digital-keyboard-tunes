// custom-button

interface CustomButtonProps {
	children: React.ReactNode;
	ariaLabel: string;
}

export default function CustomButton({
	children,
	ariaLabel,
}: CustomButtonProps): JSX.Element {
	return (
		<button className="custom-button" aria-label={ariaLabel}>
			{children}
		</button>
	);
}

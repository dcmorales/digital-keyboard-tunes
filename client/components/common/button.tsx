// button

interface ButtonProps {
	children: React.ReactNode;
	ariaLabel: string;
}

export default function Button({
	children,
	ariaLabel,
}: ButtonProps): JSX.Element {
	return <button aria-label={ariaLabel}>{children}</button>;
}

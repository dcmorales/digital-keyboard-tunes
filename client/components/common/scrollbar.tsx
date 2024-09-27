// scrollbar
// A wrapper component that makes its children scrollable

interface ScrollbarProps {
	children: React.ReactNode;
}

export default function Scrollbar({ children }: ScrollbarProps): JSX.Element {
	return (
		<div
			className="scrollbar"
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

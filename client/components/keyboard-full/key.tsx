interface KeyProps {
	note: string;
}

export default function Key({ note }: KeyProps): JSX.Element {
	return <button aria-label={`Play ${note} note`}>{note}</button>;
}

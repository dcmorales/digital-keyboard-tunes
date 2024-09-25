interface KeyProps {
	note: string;
}

export default function Key({ note }: KeyProps): JSX.Element {
	return <button aria-label={`Play the ${note} note`}>{note}</button>;
}

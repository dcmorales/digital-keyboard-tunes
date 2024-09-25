interface KeyProps {
	note: string;
}

export default function Key({ note }: KeyProps): JSX.Element {
	return (
		<button
			aria-label={`Play the ${note} note`}
			className={`key key--${note.includes('♭') ? 'black' : 'white'}`}
		>
			{note.includes('♭') ? (
				<>
					{note[0]} <span className="key__flat"> {note[1]}</span>
					{note[2]}
				</>
			) : (
				note
			)}
		</button>
	);
}

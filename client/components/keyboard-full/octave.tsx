interface OctaveProps {
	octNum: number;
}

export default function Octave({ octNum }: OctaveProps): JSX.Element {
	return (
		<div role="group" aria-label={`Octave #${octNum}`}>
			...
		</div>
	);
}

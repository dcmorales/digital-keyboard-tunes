// icon

interface IconProps {
	name: 'gear' | 'chevron';
}

const icons = {
	gear: (
		<svg
			data-testid="svg-gear"
			width="24"
			height="24"
			version="1.1"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="m1146.3 632.73c-66.984-17.953-82.164-175.02-27.215-206.73 18.012-10.441 31.98-25.246 41.207-42.324-14.293-52.117-63.059-127.2-90.574-160.6-20.113-0.9375-40.68 3.6602-59.398 14.473-59.941 34.633-183.85-57.996-165.39-126.94 5.7734-21.539 2.7227-47.664-1.9805-62.93-34.066-17.617-114.74-41.316-174.66-47.184-12.91 9.3945-27.695 32.113-33.457 53.797-19.547 72.898-174.24 83.496-207.42 26.039-11.074-19.199-31.477-37.078-45.574-42.961-38.762 11.746-122.99 60.574-157.05 88.766 2.3516 19.969 2.8086 43.164 14.258 62.965 33.156 57.469-56.641 185.26-127.55 166.26-23.328-6.2383-47.809-4.4648-67.777 3.7578-16.457 36.43-41.359 132.52-43.711 171.27 4.7031 10.57 32.746 29.137 55.176 35.137 96.516 25.871 97.273 167.41 27.348 207.78-19.754 11.41-36.672 27.254-43.715 47.23 11.746 37.586 58.957 120.21 89.496 155.46 19.969 2.3398 43.164-2.7852 62.977-14.242 62.449-36.086 187.34 48.77 166.23 127.57-5.4844 20.508-2.4492 42.086 1.0664 63.238 46.992 19.969 132 48.059 178.99 46.883 15.266-14.102 24.684-33.742 30.047-53.797 18.48-68.977 171.04-90.984 207.09-28.535 10.066 17.461 24.168 34.031 40.609 43.43 49.332-14.102 136.05-62.629 165.46-93.168 1.1523-22.309-7.2461-40.945-17.688-59.062-38.965-67.43 52.055-185.5 126.9-165.43 20.496 5.4727 42.816 3.625 61.621-1.0664 16.441-41.125 43.703-114.59 48.383-175.67-16.441-18.793-32.039-27.613-53.688-33.422zm-228.05 45.566c-45.684 170.61-221 271.81-391.59 226.12-170.55-45.719-271.77-221.07-226.07-391.67 45.695-170.59 221.02-271.81 391.57-226.11 170.57 45.707 271.79 221.04 226.08 391.66z"
				fillRule="evenodd"
			/>
		</svg>
	),
	chevron: (
		<svg
			data-testid="svg-chevron"
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="32"
			height="18"
			shape-rendering="geometricPrecision"
			text-rendering="geometricPrecision"
			image-rendering="optimizeQuality"
			fill-rule="evenodd"
			clip-rule="evenodd"
			viewBox="0 0 512 298.04"
		>
			<path
				fill-rule="nonzero"
				d="M12.08 70.78c-16.17-16.24-16.09-42.54.15-58.7 16.25-16.17 42.54-16.09 58.71.15L256 197.76 441.06 12.23c16.17-16.24 42.46-16.32 58.71-.15 16.24 16.16 16.32 42.46.15 58.7L285.27 285.96c-16.24 16.17-42.54 16.09-58.7-.15L12.08 70.78z"
			/>
		</svg>
	),
};

export default function Icon({ name }: IconProps): JSX.Element {
	const IconSVG = icons[name];

	return <>{IconSVG}</>;
}

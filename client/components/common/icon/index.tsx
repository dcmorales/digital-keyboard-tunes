// icon
// An icon that accepts a name prop. The name passed in will determine the svg provided.

import styles from './icon.module.scss';

interface IconProps {
	size?: 'small' | 'medium' | 'large';
	name:
		| 'close'
		| 'gear'
		| 'github'
		| 'menu'
		| 'play'
		| 'repeat'
		| 'shuffle'
		| 'stop';
}

const icons = {
	close: (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 4L4 12"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
			<path
				d="M4 4L12 12"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</svg>
	),
	gear: (
		<svg
			data-testid="svg-gear"
			width="100%"
			height="100%"
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
	github: (
		<svg
			data-testid="svg-github"
			width="100%"
			height="100%"
			viewBox="0 0 98 96"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
				fill="#000"
			/>
		</svg>
	),
	menu: (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 19 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 0H18.375V1.75H0V0ZM0 6.125H18.375V7.875H0V6.125ZM18.375 12.25H0V14H18.375V12.25Z"
				fill="#000"
			/>
		</svg>
	),
	play: (
		<svg
			data-testid="svg-play"
			fill="#000000"
			width="100%"
			height="100%"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 17.804 17.804"
			xmlSpace="preserve"
		>
			<g>
				<g id="c98_play">
					<path
						d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313
						c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04
						c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"
					/>
				</g>
				<g id="Capa_1_78_"></g>
			</g>
		</svg>
	),
	repeat: (
		<svg
			data-testid="svg-repeat"
			fill="#000000"
			width="100%"
			height="100%"
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 512 512"
			xmlSpace="preserve"
		>
			<g>
				<g>
					<path
						d="M392.533,34.133H119.467C53.589,34.133,0,87.723,0,153.6v153.6c0,65.877,53.589,119.467,119.467,119.467H179.2
						c18.825,0,34.133-15.309,34.133-34.133c0-18.825-15.309-34.133-34.133-34.133H128c-32.93,0-59.733-26.795-59.733-59.733V162.133
						c0-32.939,26.803-59.733,59.733-59.733h256c32.93,0,59.733,26.795,59.733,59.733v136.533c0,32.939-26.803,59.733-59.733,59.733
						h-17.067v-42.667c0-3.234-1.826-6.187-4.719-7.637c-2.884-1.434-6.349-1.126-8.934,0.811l-102.4,76.8
						c-2.15,1.613-3.413,4.139-3.413,6.827s1.263,5.214,3.413,6.827l102.4,76.8c1.502,1.126,3.311,1.707,5.12,1.707
						c1.297,0,2.611-0.299,3.814-0.896c2.893-1.451,4.719-4.403,4.719-7.637v-42.667h25.6C458.411,426.667,512,373.077,512,307.2V153.6
						C512,87.723,458.411,34.133,392.533,34.133z"
					/>
				</g>
			</g>
		</svg>
	),
	shuffle: (
		<svg
			data-testid="svg-shuffle"
			width="100%"
			height="100%"
			version="1.1"
			id="_x32_"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 512 512"
			xmlSpace="preserve"
		>
			<g>
				<path
					d="M418.972,324.766c-2.839-2.106-6.642-2.359-9.748-0.637c-3.081,1.733-4.862,5.102-4.549,8.629l2.624,30.327
					c-14.369-2.214-27.151-5.861-38.752-10.662c-19.448-8.088-35.958-19.484-51.219-33.685c-10.157-9.459-19.689-20.171-28.859-31.796
					c-7.702-9.785-15.116-20.266-22.457-31.074c11.697-17.149,23.66-33.336,36.538-47.513c9.748-10.783,20.026-20.422,31.097-28.678
					c12.66-9.424,26.356-17.065,42.026-22.697c9.652-3.454,20.122-6.114,31.627-7.871l-2.624,30.134
					c-0.313,3.527,1.468,6.896,4.549,8.629c3.106,1.722,6.908,1.469,9.748-0.637l89.418-66.432c2.263-1.708,3.611-4.38,3.611-7.22
					c0-2.841-1.348-5.512-3.611-7.209L418.972,39.93c-2.839-2.106-6.642-2.358-9.748-0.625c-3.081,1.72-4.862,5.102-4.549,8.617
					l2.96,34.057c-23.42,2.624-44.841,8.112-64.216,16.116c-27.848,11.468-51.291,27.811-71.197,46.284
					c-13.286,12.336-25.079,25.61-35.862,39.221c-3.322,4.212-6.523,8.449-9.676,12.697c-3.152-4.248-6.354-8.496-9.675-12.708
					c-10.76-13.611-22.53-26.91-35.791-39.258c-19.881-18.508-43.326-34.876-71.149-46.369C82.269,86.421,50.304,79.922,14.152,79.946
					H0v66.564h14.152c25.056,0.012,45.684,3.864,63.591,10.289c15.669,5.644,29.34,13.311,42.001,22.758
					c11.048,8.256,21.301,17.907,31.074,28.703c12.852,14.201,24.766,30.399,36.465,47.561c-7.342,10.795-14.78,21.265-22.505,31.036
					c-9.171,11.626-18.726,22.325-28.884,31.772c-15.283,14.177-31.794,25.549-51.266,33.624c-19.497,8.028-42.145,12.925-70.475,12.95
					H0v66.551h14.152c31.964,0.024,60.679-5.042,86.12-14.225c22.288-7.992,41.977-19.111,59.306-32.06
					c15.164-11.324,28.546-24.046,40.604-37.392c9.532-10.566,18.245-21.529,26.429-32.589c8.16,11.071,16.848,22.048,26.38,32.614
					c12.058,13.37,25.417,26.102,40.581,37.451c17.304,12.974,36.97,24.106,59.234,32.133c16.849,6.089,35.117,10.337,54.806,12.552
					l-2.937,33.841c-0.313,3.515,1.468,6.896,4.549,8.617c3.106,1.734,6.908,1.48,9.748-0.626l89.418-66.443
					c2.263-1.697,3.611-4.367,3.611-7.208c0-2.84-1.348-5.524-3.611-7.222L418.972,324.766z"
				/>
			</g>
		</svg>
	),
	stop: (
		<svg
			data-testid="svg-stop"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
		>
			<path d="M2,20H18a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V18A2,2,0,0,0,2,20Z" />
		</svg>
	),
};

export default function Icon({ name, size = 'small' }: IconProps): JSX.Element {
	const IconSVG = icons[name];

	return <div className={styles[`${size}`]}>{IconSVG}</div>;
}

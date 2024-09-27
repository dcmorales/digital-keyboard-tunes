// Home page

import KeyboardFull from '@/components/keyboard-full';
import KeyboardSelected from '@/components/keyboard-selected';

export default function Home(): JSX.Element {
	return (
		<div>
			<h1>Digital Keyboard Tunes</h1>

			<KeyboardFull />

			<KeyboardSelected />
		</div>
	);
}

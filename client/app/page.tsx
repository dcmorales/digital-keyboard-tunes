// Home page

import KeyboardFull from '@/components/keyboard-full';
import KeyboardSelected from '@/components/keyboard-selected';

export default function Home(): JSX.Element {
	return (
		<div className="home">
			<h1>Digital Keyboard Tunes</h1>

			<KeyboardFull />

			<KeyboardSelected />
		</div>
	);
}

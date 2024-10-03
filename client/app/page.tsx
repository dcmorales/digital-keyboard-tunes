// Home page

import AudioControls from '@/components/audio-controls';
import KeyboardFull from '@/components/keyboard-full';
import KeyboardSelected from '@/components/keyboard-selected';
import Header from '@/components/layout/header';

export default function Home(): JSX.Element {
	return (
		<div className="home">
			<Header />

			<KeyboardFull />

			<AudioControls />

			<KeyboardSelected />
		</div>
	);
}

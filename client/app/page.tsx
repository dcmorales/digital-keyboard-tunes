// Home page

import ControlPanel from '@/components/control-panel';
import KeyboardFull from '@/components/keyboard-full';
import Header from '@/components/layout/header';

export default function Home(): JSX.Element {
	return (
		<div className="home">
			<Header />

			<KeyboardFull />

			<ControlPanel />
		</div>
	);
}

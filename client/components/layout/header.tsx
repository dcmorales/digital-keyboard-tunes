// header

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import KeyboardSettings from '@/components/keyboard-settings';

export default function Header(): JSX.Element {
	return (
		<header className="header">
			<h1>Digital Keyboard Tunes</h1>

			<CustomButton ariaLabel="Open keyboard settings">
				<Icon name="gear" />
			</CustomButton>

			<KeyboardSettings />
		</header>
	);
}

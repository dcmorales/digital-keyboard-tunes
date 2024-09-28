// header

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';

export default function Header(): JSX.Element {
	return (
		<header className="header">
			<h1>Digital Keyboard Tunes</h1>

			<CustomButton ariaLabel="Open keyboard settings">
				<Icon name="gear" />
				<Icon name="chevron" />
			</CustomButton>
		</header>
	);
}

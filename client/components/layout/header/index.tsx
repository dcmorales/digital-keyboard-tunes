// header
// The header for the app. Includes a heading and a settings button.
// Clicking on the settings button will toggle the keyboard-settings on and off.

'use client';

import { useState } from 'react';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import KeyboardSettings from '@/components/keyboard-settings';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
	const [showSettings, setShowSettings] = useState(false);

	const toggleSettings = (): void => {
		setShowSettings((prevState) => !prevState);
	};

	return (
		<header className={styles.header}>
			<div className={styles.mainItems}>
				<h1>Digital Keyboard Tunes</h1>

				<CustomButton
					ariaLabel={`${!showSettings ? 'Open' : 'Close'} keyboard settings`}
					onClick={toggleSettings}
				>
					<Icon name="gear" size="medium" />
				</CustomButton>
			</div>

			{showSettings && <KeyboardSettings />}
		</header>
	);
}

// header
// The header for the app. Includes a heading and a settings button.
// Clicking on the settings button will toggle the keyboard-settings on and off.

'use client';

import Link from 'next/link';
import { useState } from 'react';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import KeyboardSettings from '@/components/keyboard-settings';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
	const [showSettings, setShowSettings] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const toggleSettings = (): void => {
		setShowSettings((prevState) => !prevState);
	};

	const toggleMenu = (): void => {
		setShowMenu((prevState) => !prevState);
	};

	return (
		<header className={styles.header}>
			<div className={styles.mainItems}>
				<Link href="/">
					<h1>Digital Keyboard Tunes</h1>
				</Link>

				<div className={styles.buttonsContainer}>
					<CustomButton
						ariaLabel={`${!showSettings ? 'Open' : 'Close'} keyboard settings`}
						onClick={toggleSettings}
					>
						<Icon name="gear" size="medium" />
					</CustomButton>

					<CustomButton
						ariaLabel={`${!showMenu ? 'Open' : 'Close'} menu`}
						onClick={toggleMenu}
					>
						<Icon name={!showMenu ? 'menu' : 'close'} size="medium" />
					</CustomButton>
				</div>
			</div>

			{showSettings && <KeyboardSettings />}
		</header>
	);
}

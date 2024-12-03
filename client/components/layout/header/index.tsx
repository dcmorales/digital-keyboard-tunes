// header
// The header for the app. Includes a clickable heading, a settings button, and
// a menu button. Clicking on the settings button will toggle the keyboard-settings
// on and off. Clicking on the menu will open the nav. Settings are not visible on pages
// that do not include the digital-keyboard.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import IconButton from '@/components/common/icon-button';
import KeyboardSettings from '@/components/keyboard-settings';
import Nav from '@/components/layout/nav';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
	const pathname = usePathname();
	const [showSettings, setShowSettings] = useState<boolean>(false);
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const toggleSettings = (): void => {
		setShowSettings((prevState) => !prevState);
	};

	const handleMenuClick = (): void => {
		setShowSettings(false);
		setShowMenu(true);
	};

	return (
		<header className={styles.header}>
			<div className={styles.mainItems}>
				<Link href="/">
					<h1>Digital Keyboard Tunes</h1>
				</Link>

				<div className={styles.buttonsContainer}>
					{pathname !== '/about' && (
						<IconButton
							icon="gear"
							iconSize="small"
							ariaLabel={`${!showSettings ? 'Open' : 'Close'} keyboard settings`}
							onClick={toggleSettings}
						/>
					)}

					<IconButton
						icon="menu"
						iconSize="small"
						ariaLabel="Open menu"
						onClick={handleMenuClick}
					/>
				</div>
			</div>

			{showSettings && <KeyboardSettings />}

			<Nav isOpen={showMenu} setShowMenu={setShowMenu} />
		</header>
	);
}

// nav
// The nav menu for the app. Hidden until the menu button in the
// header is clicked. Slides out from the right side. Contains
// the main links for pages.

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import styles from './nav.module.scss';

interface NavProps {
	isOpen: boolean;
	setShowMenu: (showMenu: boolean) => void;
}

export default function Nav({ isOpen, setShowMenu }: NavProps) {
	const [menuRoot, setMenuRoot] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setMenuRoot(document.getElementById('menu-root'));
	}, []);

	const closeMenu = (): void => {
		setShowMenu(false);
	};

	const navContent = (
		<>
			{isOpen && (
				<div
					className={styles.overlay}
					onClick={closeMenu}
					role="presentation"
				/>
			)}

			<nav
				className={`${styles.nav} ${isOpen ? styles.open : styles.closed}`}
				aria-hidden={!isOpen}
			>
				<CustomButton ariaLabel="Close menu" onClick={closeMenu}>
					<Icon name="close" />
				</CustomButton>

				<ul>
					<li>
						<Link href="/" onClick={closeMenu}>
							Home
						</Link>
					</li>

					<li>
						<Link href="/about" onClick={closeMenu}>
							About
						</Link>
					</li>

					<li>
						<a
							className={styles.link}
							href="https://github.com/dcmorales/digital-keyboard-tunes"
							target="_blank"
							rel="noopener noreferrer"
						>
							Github Repository
						</a>
					</li>
				</ul>
			</nav>
		</>
	);

	if (!menuRoot) return null;

	return createPortal(navContent, menuRoot);
}

// nav
// The nav menu for the app. Hidden until the menu button in the header is clicked.
// Slides out from the right side. Contains the main links for pages. Uses a portal
// to render it higher in the DOM hierarchy and only renders once the DOM is ready.

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '@/components/common/icon-button';
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
				<IconButton
					icon="close"
					iconSize="small"
					ariaLabel="Close menu"
					onClick={closeMenu}
				/>

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

// nav
// The nav menu for the app. Hidden until the menu button in the
// header is clicked. Slides out from the right side. Contains
// the main links for pages.

import Link from 'next/link';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import styles from './nav.module.scss';

interface NavProps {
	isOpen: boolean;
	setShowMenu: (showMenu: boolean) => void;
}

export default function Nav({ isOpen, setShowMenu }: NavProps) {
	const closeMenu = (): void => {
		setShowMenu(false);
	};

	return (
		<>
			{isOpen && (
				<div
					className={styles.overlay}
					onClick={closeMenu}
					role="presentation"
				/>
			)}

			<nav className={`${styles.nav} ${isOpen ? styles.open : styles.closed}`}>
				<CustomButton ariaLabel="Close menu" onClick={closeMenu}>
					<Icon name="close" size="medium" />
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
}

// nav

import Link from 'next/link';
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

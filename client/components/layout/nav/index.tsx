// nav

import Link from 'next/link';
import styles from './nav.module.scss';

interface NavProps {
	isOpen: boolean;
}

export default function Nav({ isOpen }: NavProps) {
	return (
		<>
			{isOpen && <div className={styles.overlay} />}

			<nav className={`${styles.nav} ${isOpen ? styles.open : styles.closed}`}>
				<ul>
					<li>
						<Link href="/about">About</Link>
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

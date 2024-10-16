// nav

import Link from 'next/link';
import styles from './nav.module.scss';

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>

				<li>
					<Link href="/about">About</Link>
				</li>
			</ul>
		</nav>
	);
}

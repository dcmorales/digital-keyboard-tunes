// Home page

import KeyboardSelected from '@/components/keyboard-selected';
import KeyboardFull from '@/components/keyboard-full';
import Header from '@/components/layout/header';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
	return (
		<div className={styles.container}>
			<Header />

			<KeyboardFull />

			<KeyboardSelected />
		</div>
	);
}

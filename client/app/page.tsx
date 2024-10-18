// home page

import KeyboardSelected from '@/components/keyboard-selected';
import KeyboardFull from '@/components/keyboard-full';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
	return (
		<div className={styles.homePage}>
			<KeyboardFull />

			<KeyboardSelected />
		</div>
	);
}

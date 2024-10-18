// footer
// The footer for the app. Displayed at the bottom of the page.

import Icon from '@/components/common/icon';
import styles from './footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a
				className={styles.link}
				href="https://github.com/dcmorales/digital-keyboard-tunes"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="github" /> Github Repository
			</a>
		</footer>
	);
}

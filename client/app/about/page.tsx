import styles from './about.module.scss';

export default function AboutPage() {
	return (
		<article className={styles.about}>
			<section>
				<h2>What is it</h2>
			</section>

			<section>
				<h2>Settings</h2>
				<h3>Key</h3>
				<h3>Octave</h3>
				<h3>Waveform</h3>
				<h3>Scale</h3>
				<h3>Order</h3>
				<h3>Note Length</h3>
				<h3>BPM</h3>
				<h3>Total Notes</h3>
				<h3>Repeat</h3>
			</section>

			<section>
				<h2>Audio controls</h2>
				<h3>Play</h3>
				<h3>Shuffle</h3>
				<h3>Repeat</h3>
				<h3>Stop</h3>
			</section>
		</article>
	);
}

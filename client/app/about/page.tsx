// about page

import Icon from '@/components/common/icon';

import styles from './about.module.scss';

export default function AboutPage() {
	return (
		<article className={styles.about}>
			<section>
				<h2>What is it</h2>

				<p>
					This digital keyboard application leverages the Web Audio API to
					generate sound for each key. It features a full keyboard display,
					showcasing all available keys, as well as a customizable selected
					keyboard that shows only the keys relevant to the user’s settings.
					Users can adjust various sound settings for a tailored musical
					experience, and the app supports the playback of full scales, allowing
					for seamless exploration and creation of melodies.
				</p>
			</section>

			<section>
				<h2>Settings</h2>

				<h3>Key</h3>
				<p>
					A musical key defines the pitch hierarchy and tonal center of the
					scale. The key that is selected will determine the starting note of an
					octave. The 12 options are C, D
					<span className={styles.flatSymbol}>♭</span>, D, E
					<span className={styles.flatSymbol}>♭</span>, E, F, G
					<span className={styles.flatSymbol}>♭</span>, G4, A
					<span className={styles.flatSymbol}>♭</span>, A, B
					<span className={styles.flatSymbol}>
						<span className={styles.flatSymbol}>♭</span>
					</span>
					, and B.
				</p>

				<h3>Octave</h3>
				<p>
					A musical octave is the interval between one musical pitch and another
					pitch that is double its frequency. There are 7 octaves in the full
					keyboard, each containing keys for the 12 notes mentioned above. For
					each note, going up an octave results in a higher pitch (doubling the
					frequency), while going down an octave results in a lower pitch
					(dividing the frequency in half).
				</p>

				<p>
					When selecting on octave at a particular key, the next 12 keys will be
					displayed plus a 13th key which marks the first note at the next
					octave. For example, if the starting key is C and the octave is 3, the
					last note will also be C but at octave 4.
				</p>

				<p>
					For this reason, even though there are 7 octaves, the options for this
					setting are 1-6. The octave for the final note at 6, B6, will contain
					all of the keys in octave 7, ending with B7.
				</p>

				<h3>Waveform</h3>
				<p>
					In the Web Audio API, the waveform refers to the shape of the sound
					wave generated by an oscillator, which influences the sound&apos;s
					timbre or tone quality. The oscillator can produce various types of
					waveforms, each with distinct characteristics. There are four options.
				</p>

				<ul>
					<li>
						<strong>Sine</strong>: Smooth and pure sound with no harmonics.
						Often used for creating simple tones.
					</li>

					<li>
						<strong>Square</strong>: A waveform with a sharp, abrupt sound
						characterized by strong harmonics. Commonly used in electronic music
						for bass lines and leads due to its rich sound.
					</li>

					<li>
						<strong>Sawtooth</strong>: A waveform that ramps upward and then
						sharply drops, containing a full spectrum of harmonics. Popular in
						synthesizers for pads and leads, creating a bright and aggressive
						sound.
					</li>

					<li>
						<strong>Triangle</strong>: Similar to the sine wave but with a more
						pronounced sound due to its harmonics. Often used for softer sounds
						and is ideal for creating mellow tones.
					</li>
				</ul>

				<h3>Scale</h3>
				<p>
					Musical scales are structured sequences of notes that provide the
					foundation for melodies and harmonies in music. These scales are
					defined by specific patterns of intervals, which determine the
					distance between the notes. W stands for a whole step, which is an
					interval of two semitones (e.g., from C to D). H stands for a half
					step, which is an interval of one semitone (e.g., from E to F). A2
					stands for a whole step plus a half step, equivalent to three
					semitones (e.g., from G to B
					<span className={styles.flatSymbol}>♭</span>).
				</p>
				<ul>
					<li>
						<strong>Chromatic</strong>: Made up entirely of half steps
						(semitones). Consists of all pitches within an octave including both
						natural notes and their corresponding flats.
					</li>

					<li>
						<strong>Major</strong>: Characterized by a happy and bright sound,
						it follows a specific pattern of whole and half steps
						(W-W-H-W-W-W-H).
					</li>

					<li>
						<strong>Natural Minor</strong>: Known for its somber tone, it
						follows the pattern (W-H-W-W-H-W-W), offering a darker sound
						compared to major.
					</li>

					<li>
						<strong>Harmonic Minor</strong>: Similar to the natural minor but
						with a raised seventh degree, creating a leading tone
						(W-H-W-W-H-A2-H).
					</li>
					<li>
						<strong>Melodic Minor</strong>: Creates a sense of movement and
						tension, making it ideal for expressive melodies and jazz
						improvisation. Follows the pattern (W-H-W-W-W-W-H).
					</li>

					<li>
						<strong>Major Pentatonic</strong>: Contains five notes and is often
						associated with a bright, uplifting sound; follows the pattern
						(W-W-W+H-W-W+H).
					</li>

					<li>
						<strong>Minor Pentatonic</strong>: A five-note scale with a more
						melancholic tone; follows the pattern (W+H-W-W-W+H-W).
					</li>

					<li>
						<strong>Blues</strong>: A variant of the pentatonic scale with an
						added “blue note,” commonly used in blues and jazz music. Follows
						the pattern (W+H-W-H-H-W+H-W)/.
					</li>
				</ul>

				<h3>Order</h3>
				<p>
					The direction in which a sequence of musical notes moves, specifically
					in relation to pitch.
				</p>
				<ul>
					<li>
						<strong>Ascending order</strong>: The pitches increase in frequency,
						moving from lower to higher notes. For instance, in a C major scale,
						the notes progress from C to D to E, and so on, culminating at the
						higher C.
					</li>

					<li>
						<strong>Descending order</strong>: The pitches decrease in
						frequency, moving from higher to lower notes. Using the same C major
						scale, descending would move from C to B to A, and so forth, down to
						the lower C.
					</li>

					<li>
						<strong>Random order</strong>: All of the notes in the scale will be
						shuffled and played in a random order.
					</li>
				</ul>

				<h3>Note Length</h3>
				<p>Note lengths represent the durations a note will play for.</p>
				<ul>
					<li>
						<strong>1/4</strong>: A quarter note. Represents one beat in common
						time (4/4).
					</li>

					<li>
						<strong>1/8</strong>: An eighth note. Represents half a beat in
						common time (4/4).
					</li>

					<li>
						<strong>1/16</strong>: A sixteenth note. Represents a quarter of a
						beat in common time (4/4).
					</li>
				</ul>

				<h3>BPM</h3>
				<p>
					Beats Per Minute indicates the tempo at which the scale will play. It
					specifies the number of beats (quarter notes) that occur in one
					minute.
				</p>

				<h3>Total Notes</h3>
				<p>
					The total number of unique notes to play from the scale. The highest
					number will be the total number of notes in the selected scale. For
					example, a major scale has 8 notes so the highest number that can be
					selected will be 8.
				</p>

				<h3>Repeat</h3>
				<p>
					The number of times to repeat the unique notes in the scale. As an
					example, the selection 1 means the scale will play once then repeat
					once, playing a total of two times.
				</p>
			</section>

			<section>
				<h2>Audio controls</h2>

				<h3>Play</h3>
				<p>
					A button that is visible if the order is set to ascending or
					descending. It will play the scale based on the selections made.
					Represented by the play icon <Icon name="play" />
				</p>

				<h3>Shuffle</h3>
				<p>
					A button that is only visible if the order is set to random. Similar
					to the play button, it will play the scale based on the selections
					made but the order of the notes will be random. Represented by the
					shuffle icon <Icon name="shuffle" />
				</p>

				<h3>Repeat</h3>
				<p>
					A button that is only visible if the order is set to random. It will
					repeat the last scale played with the same previous settings.
					Represented by the repeat icon <Icon name="repeat" />
				</p>

				<h3>Stop</h3>
				<p>
					A button that is always visible. Pressing it will immediately stop the
					playing scale. It is disabled if a scale isn&apos;t playing
					Represented by the stop icon <Icon name="stop" />
				</p>
			</section>
		</article>
	);
}

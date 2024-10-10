// audio-controls
// Contains the buttons that control whether the selected scale plays.
// Clicking the play button will play each note in the orderedScaleNotes array and set
// it as active (changing the appearance of the key). After a delay, it will then stop
// the note and remove it from active (resetting the appearance of the key).

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/key-utils';
import styles from './audio-controls.module.scss';

export default function AudioControls(): JSX.Element {
	const {
		orderedScaleNotes,
		selectedBpm,
		selectedNoteLength,
		selectedWaveform,
		setActiveNote,
	} = useKeyboardOptions();

	function playOrderedScaleNotes(): void {
		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);

		orderedScaleNotes.forEach((fullNote, index) => {
			const playDelay = index * noteDuration;

			setTimeout(() => {
				setActiveNote(fullNote);
				playNote(fullNote, selectedWaveform);
			}, playDelay);

			if (index === orderedScaleNotes.length - 1) {
				setTimeout(() => {
					fadeOutNote();
					setActiveNote(null);
				}, playDelay + noteDuration);
			}
		});
	}

	const handlePlayClick = (): void => {
		playOrderedScaleNotes();
	};

	return (
		<div
			className={styles.audioControls}
			role="group"
			aria-label="Audio controls"
		>
			<CustomButton ariaLabel="Play the scale" onClick={handlePlayClick}>
				<Icon name="play" />
			</CustomButton>
		</div>
	);
}

// audio-controls
// Contains the buttons that control whether the selected scale plays.
// Clicking the play button will play each note in the totalNotes array
// at the calculated noteDuration. Provided context values are used to
// calculate the totalNotes array and the noteDuration.

import { useState } from 'react';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/audio-utils';
import { getAllNotes } from '@/utils/scale-note-utils';
import styles from './audio-controls.module.scss';

export default function AudioControls(): JSX.Element {
	const {
		orderedScaleNotes,
		selectedBpm,
		selectedNoteLength,
		selectedWaveform,
		selectedTotalNotes,
		selectedRepeatNum,
		setActiveNote,
	} = useKeyboardOptions();
	const [isPlaying, setIsPlaying] = useState(false);

	function playOrderedScaleNotes(): void {
		setIsPlaying(true);

		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);

		// get new array of all notes that will be played
		const totalNotes = getAllNotes(
			orderedScaleNotes,
			selectedTotalNotes,
			selectedRepeatNum
		) as FullNote[];

		totalNotes.forEach((fullNote, index) => {
			const playDelay = index * noteDuration;

			setTimeout(() => {
				// setting note to active will update the key's appearance
				setActiveNote(fullNote);
				playNote(fullNote, selectedWaveform);
			}, playDelay);

			// since playNote updates frequency as new values are passed in,
			// fadeOutNote only needs to be called on the very last note
			if (index === totalNotes.length - 1) {
				setTimeout(() => {
					fadeOutNote();
					setActiveNote(null);
					setIsPlaying(false);
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
			<CustomButton
				ariaLabel="Play the scale"
				disabled={isPlaying}
				onClick={handlePlayClick}
			>
				<Icon name="play" />
			</CustomButton>
		</div>
	);
}

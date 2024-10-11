// audio-controls
// Contains the buttons that control whether the selected scale plays.
// Clicking the play button will play each note in the totalNotes array
// at the calculated noteDuration. Provided context values are used to
// calculate the totalNotes array and the noteDuration.

import { useRef } from 'react';

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
		isPlaying,
		setIsPlaying,
		setActiveNote,
	} = useKeyboardOptions();
	const playbackTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
	const finalNoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	function playOrderedScaleNotes(): void {
		setIsPlaying(true);

		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);
		const totalNotes = getAllNotes(
			orderedScaleNotes,
			selectedTotalNotes,
			selectedRepeatNum
		) as FullNote[];

		// clear any existing timeouts
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = []; // Reset the ref array

		totalNotes.forEach((fullNote, index) => {
			const playDelay = index * noteDuration;

			const timeoutId = setTimeout(() => {
				// setting note to active will update the key's appearance
				setActiveNote(fullNote);
				playNote(fullNote, selectedWaveform);
			}, playDelay);

			// since playNote updates frequency as new values are passed in,
			// fadeOutNote only needs to be called on the very last note
			if (index === totalNotes.length - 1) {
				finalNoteTimeoutRef.current = setTimeout(() => {
					fadeOutNote();
					setActiveNote(null);
					setIsPlaying(false);
				}, playDelay + noteDuration);
			}

			playbackTimeoutsRef.current.push(timeoutId);
		});
	}

	const handlePlayClick = (): void => {
		playOrderedScaleNotes();
	};

	const handleStopClick = (): void => {
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = []; // reset the ref array

		clearTimeout(finalNoteTimeoutRef.current as NodeJS.Timeout);
		finalNoteTimeoutRef.current = null;

		fadeOutNote();
		setIsPlaying(false);
		setActiveNote(null);
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

			<CustomButton
				ariaLabel="Stop the scale"
				disabled={!isPlaying}
				onClick={handleStopClick}
			>
				<Icon name="stop" />
			</CustomButton>
		</div>
	);
}

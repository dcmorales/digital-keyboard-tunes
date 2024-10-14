// audio-controls
// Contains the buttons that control whether the selected scale plays.
// Clicking the play button will play each note in the totalNotes array
// at the calculated noteDuration. Provided context values are used to
// calculate the totalNotes array and the noteDuration.

import { useRef, useState } from 'react';

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
	const [lastPlayedNotes, setLastPlayedNotes] = useState<FullNote[]>([]);
	const [hasPlayed, setHasPlayed] = useState<boolean>(false);

	const totalNotes = getAllNotes(
		orderedScaleNotes,
		selectedTotalNotes,
		selectedRepeatNum
	) as FullNote[];

	function playOrderedScaleNotes(notes: FullNote[]): void {
		setHasPlayed(true);
		setIsPlaying(true);

		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);

		// clear any existing timeouts
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = []; // Reset the ref array

		notes.forEach((fullNote, index) => {
			const playDelay = index * noteDuration;

			const timeoutId = setTimeout(() => {
				// setting note to active will update the key's appearance
				setActiveNote(fullNote);
				playNote(fullNote, selectedWaveform);
			}, playDelay);

			// since playNote updates frequency as new values are passed in,
			// fadeOutNote only needs to be called on the very last note
			if (index === notes.length - 1) {
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
		setLastPlayedNotes(totalNotes);
		playOrderedScaleNotes(totalNotes);
	};

	const handleRepeatClick = (): void => {
		playOrderedScaleNotes(lastPlayedNotes);
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
			{!hasPlayed && (
				<CustomButton
					ariaLabel="Play the scale"
					disabled={isPlaying}
					onClick={handlePlayClick}
				>
					<Icon name="play" />
				</CustomButton>
			)}

			{hasPlayed && (
				<>
					<CustomButton
						ariaLabel="Shuffle the scale"
						disabled={isPlaying}
						onClick={handlePlayClick}
					>
						<Icon name="shuffle" />
					</CustomButton>

					<CustomButton
						ariaLabel="Repeat the scale"
						disabled={isPlaying}
						onClick={handleRepeatClick}
					>
						<Icon name="repeat" />
					</CustomButton>
				</>
			)}

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

// audio-controls
// Contains the buttons that play / stop the selected scale. Play button is visible when
// the order isn't 'random', shuffle and repeat are visible when the order is 'random',
// and stop is alway visible. Clicking the play button will play each note in the totalNotes array
// at the calculated noteDuration. Provided context values are used to calculate the totalNotes
// array and the noteDuration. The shuffle button will do the same but with a shuffled notes array.
// Both buttons will update the lastPlayedNotes from the keyboard-selected parent component.
// After an initial play, the repeat button will use the lastPlayedNotes to replay the notes that
// just played. The stop button will stop the scale immediately. Play, shuffle, and repeat are
// disabled while a scale is playing. Stop is disabled if there is no scale playing.

import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { fadeOutNote, noteDurationInMs, playNote } from '@/utils/audio-utils';
import { getAllNotes } from '@/utils/scale-note-utils';
import styles from './audio-controls.module.scss';

interface AudioControlsProps {
	lastPlayedNotes: FullNote[];
	setLastPlayedNotes: (notes: FullNote[]) => void;
}

export default function AudioControls({
	lastPlayedNotes,
	setLastPlayedNotes,
}: AudioControlsProps): JSX.Element {
	const {
		orderedScaleNotes,
		selectedBpm,
		selectedNoteLength,
		selectedWaveform,
		selectedTotalNotes,
		selectedRepeatNum,
		selectedOrder,
		isPlaying,
		setIsPlaying,
		setActiveNote,
	} = useKeyboardOptions();
	const playbackTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
	const finalNoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [hasPlayedRandom, setHasPlayedRandom] = useState<boolean>(false);

	const totalNotes = getAllNotes(
		orderedScaleNotes,
		selectedTotalNotes,
		selectedRepeatNum
	) as FullNote[];

	useEffect(() => {
		setHasPlayedRandom(false);
	}, [selectedOrder]);

	function playOrderedScaleNotes(notes: FullNote[]): void {
		if (selectedOrder === 'random') {
			setHasPlayedRandom(true);
		}

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
			{selectedOrder !== 'random' && (
				<CustomButton
					ariaLabel="Play the scale"
					disabled={isPlaying}
					onClick={handlePlayClick}
				>
					<Icon name="play" />
				</CustomButton>
			)}

			{selectedOrder === 'random' && (
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
						disabled={isPlaying || !hasPlayedRandom}
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

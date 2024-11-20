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

import IconButton from '@/components/common/icon-button';
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

	// when hasPlayedRandom is true, the repeat button will no longer be disabled.
	// since this is only a concern if the order is 'random', hasPlayedRandom is
	// reset whenever the order is changed
	useEffect(() => {
		setHasPlayedRandom(false);
	}, [selectedOrder]);

	const playOrderedScaleNotes = (notes: FullNote[]): void => {
		// enable repeat button when order is 'random'
		if (selectedOrder === 'random') {
			setHasPlayedRandom(true);
		}

		// disable buttons (except stop) while notes are playing
		setIsPlaying(true);

		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);

		// clear any existing timeouts
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = []; // Reset the ref array

		notes.forEach((fullNote, index) => {
			// incremented delay ensures each note plays in succession
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
					// enable buttons (disable stop)
					setIsPlaying(false);
				}, playDelay + noteDuration);
			}

			// ref to keep track of each note's timeout; necessary to correctly stop notes
			playbackTimeoutsRef.current.push(timeoutId);
		});
	};

	const handlePlayClick = (): void => {
		setLastPlayedNotes(totalNotes);
		playOrderedScaleNotes(totalNotes);
	};

	const handleRepeatClick = (): void => {
		playOrderedScaleNotes(lastPlayedNotes);
	};

	const handleStopClick = (): void => {
		// clear each remaining note's timeout
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = []; // reset the ref array

		// clear final note timeout
		clearTimeout(finalNoteTimeoutRef.current as NodeJS.Timeout);
		finalNoteTimeoutRef.current = null; // reset ref

		fadeOutNote(); // fade out the last played note
		setIsPlaying(false); // reset buttons
		setActiveNote(null); // reset appearance of keys
	};

	return (
		<div
			className={styles.audioControls}
			role="group"
			aria-label="Audio controls"
		>
			{selectedOrder !== 'random' && (
				<IconButton
					icon="play"
					tooltipPosition="right"
					tooltipWidth="6.5rem"
					ariaLabel="Play the scale"
					disabled={isPlaying}
					onClick={handlePlayClick}
				/>
			)}

			{selectedOrder === 'random' && (
				<>
					<IconButton
						icon="shuffle"
						tooltipPosition="right"
						ariaLabel="Shuffle the scale"
						disabled={isPlaying}
						onClick={handlePlayClick}
					/>

					<IconButton
						icon="repeat"
						tooltipPosition="right"
						ariaLabel="Repeat the scale"
						disabled={isPlaying || !hasPlayedRandom}
						onClick={handleRepeatClick}
					/>
				</>
			)}

			<IconButton
				icon="stop"
				tooltipPosition="right"
				tooltipWidth="6.5rem"
				ariaLabel="Stop the scale"
				disabled={!isPlaying}
				onClick={handleStopClick}
			/>
		</div>
	);
}

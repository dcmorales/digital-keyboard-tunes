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
import { useResizeEffect } from '@/hooks/useResizeEffect';
import variables from '@/styles/abstracts/variables.module.scss';
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
	const [repeatEnabled, setRepeatEnabled] = useState<boolean>(false);
	const [tooltipPosition, setTooltipPosition] = useState<'top' | 'right'>(
		'right'
	);
	const totalNotes = getAllNotes(
		orderedScaleNotes,
		selectedTotalNotes,
		selectedRepeatNum
	) as FullNote[];
	const tabletBreakpoint = parseInt(variables.tabletBreakpoint);

	// clean up on component unmount
	useEffect(() => {
		return () => {
			playbackTimeoutsRef.current.forEach((timeoutId) =>
				clearTimeout(timeoutId)
			);
			playbackTimeoutsRef.current = [];
			clearTimeout(finalNoteTimeoutRef.current as NodeJS.Timeout);
			finalNoteTimeoutRef.current = null;
		};
	}, []);

	// reset the repeat button whenever order changes from 'random'
	useEffect(() => {
		setRepeatEnabled(false);
	}, [selectedOrder]);

	const handleResize = (): void => {
		setTooltipPosition(window.innerWidth < tabletBreakpoint ? 'top' : 'right');
	};

	useResizeEffect(handleResize);

	const playOrderedScaleNotes = (notes: FullNote[]): void => {
		if (selectedOrder === 'random') {
			setRepeatEnabled(true);
		}

		// disable buttons (except stop) while notes are playing
		setIsPlaying(true);

		const noteDuration = noteDurationInMs(selectedBpm, selectedNoteLength);

		// clear any existing timeouts and reset the ref array
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = [];

		notes.forEach((fullNote, index) => {
			// incremented delay ensures each note plays in succession
			const playDelay = index * noteDuration;

			const timeoutId = setTimeout(() => {
				setActiveNote(fullNote); // update active key's appearance
				playNote(fullNote, selectedWaveform);
			}, playDelay);

			// reset after final note
			if (index === notes.length - 1) {
				finalNoteTimeoutRef.current = setTimeout(() => {
					fadeOutNote();
					setIsPlaying(false);
					setActiveNote(null);
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
		// clear timeouts and reset refs
		playbackTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		playbackTimeoutsRef.current = [];
		clearTimeout(finalNoteTimeoutRef.current as NodeJS.Timeout);
		finalNoteTimeoutRef.current = null;

		// reset after last played note
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
				<IconButton
					icon="play"
					hasTooltip
					tooltipPosition={tooltipPosition}
					tooltipWidth={6.5}
					ariaLabel="Play the scale"
					disabled={isPlaying}
					onClick={handlePlayClick}
				/>
			)}

			{selectedOrder === 'random' && (
				<>
					<IconButton
						icon="shuffle"
						hasTooltip
						tooltipPosition={tooltipPosition}
						ariaLabel="Shuffle the scale"
						disabled={isPlaying}
						onClick={handlePlayClick}
					/>

					<IconButton
						icon="repeat"
						hasTooltip
						tooltipPosition={tooltipPosition}
						ariaLabel="Repeat the scale"
						disabled={isPlaying || !repeatEnabled}
						onClick={handleRepeatClick}
					/>
				</>
			)}

			<IconButton
				icon="stop"
				hasTooltip
				tooltipPosition={tooltipPosition}
				tooltipWidth={6.5}
				ariaLabel="Stop the scale"
				disabled={!isPlaying}
				onClick={handleStopClick}
			/>
		</div>
	);
}

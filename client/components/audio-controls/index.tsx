// audio-controls

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import { playNote, stopNote } from '@/utils/key-functions';
import styles from './audio-controls.module.scss';

export default function AudioControls(): JSX.Element {
	const { selectedWaveform, setActiveNote, selectedScaleNotes } =
		useKeyboardOptions();

	function playSelectedScaleNotes(): void {
		selectedScaleNotes.forEach((fullNote, index) => {
			const playDelay = index * 400;

			setTimeout(() => {
				setActiveNote(fullNote);
				playNote(fullNote, selectedWaveform);

				setTimeout(() => {
					stopNote();
					setActiveNote(null);
				}, 200);
			}, playDelay);
		});
	}

	const handlePlayClick = (): void => {
		playSelectedScaleNotes();
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

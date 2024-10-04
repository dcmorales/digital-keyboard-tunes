// audio-controls

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useKeyboardOptions } from '@/context/keyboard-options-context';
import type { FullNote } from '@/types/keyboard-option-types';
import { playSelectedNotes } from '@/utils/audio-control-functions';

interface AudioControlsProps {
	fullNotes: FullNote[];
}

export default function AudioControls({
	fullNotes,
}: AudioControlsProps): JSX.Element {
	const { selectedWaveform, setActiveNote } = useKeyboardOptions();

	const handlePlayClick = (): void => {
		playSelectedNotes(fullNotes, selectedWaveform, setActiveNote);
	};

	return (
		<div role="group" aria-label="Audio controls">
			<CustomButton ariaLabel="Play the scale" onClick={handlePlayClick}>
				<Icon name="play" />
			</CustomButton>
		</div>
	);
}

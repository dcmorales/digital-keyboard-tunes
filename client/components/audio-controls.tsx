// audio-controls

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';

export default function AudioControls() {
	return (
		<div role="group" aria-label="Audio controls">
			<CustomButton ariaLabel="Play the scale">
				<Icon name="play" />
			</CustomButton>
		</div>
	);
}

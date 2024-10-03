// control-panel

import AudioControls from '@/components/audio-controls';
import KeyboardSelected from '@/components/keyboard-selected';

export default function ControlPanel() {
	return (
		<div role="region" aria-label="Audio controls and selected keyboard">
			<AudioControls />

			<KeyboardSelected />
		</div>
	);
}

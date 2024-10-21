// tooltip
// A tooltip component that displays an info icon. When hovered over,
// focused on, or clicked the tooltip text becomes visible.

'use client';

import { useState } from 'react';

import Icon from '@/components/common/icon';
import styles from './tooltip.module.scss';

interface TooltipProps {
	topic: string;
	text: string;
}

export default function Tooltip({ topic, text }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	const showTooltip = (): void => {
		setIsVisible(true);
	};

	const hideTooltip = (): void => {
		setIsVisible(false);
	};

	return (
		<div className={styles.tooltipContainer} aria-describedby="tooltip">
			<button
				aria-label={`Information for ${topic}`}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
				onFocus={showTooltip}
				onBlur={hideTooltip}
			>
				<Icon name="info" size="x-small" />
			</button>

			{isVisible && (
				<div
					id="tooltip"
					role="tooltip"
					className={styles.tooltip}
					aria-hidden={!isVisible}
				>
					{text}
				</div>
			)}
		</div>
	);
}

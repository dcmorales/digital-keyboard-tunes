// tooltip
// A tooltip component that displays an info icon. When hovered over
// or focused on, the tooltip text becomes visible. If the tooltip is too
// far to the right, the position will be updated to the left so that it
// isn't cut off from view.

'use client';

import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/icon';
import { debounce } from '@/utils/debounce';
import styles from './tooltip.module.scss';

// also used in settingsOptions
export interface TooltipProps {
	topic: string;
	text: string;
}

export default function Tooltip({ topic, text }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isPositionedLeft, setIsPositionedLeft] = useState(false);
	const tooltipTextRef = useRef<HTMLDivElement | null>(null);

	const showTooltip = (): void => {
		setIsVisible(true);
	};

	const hideTooltip = (): void => {
		setIsVisible(false);
	};

	// if the tooltip text has screen overflow, reposition it
	const checkPosition = (): void => {
		if (tooltipTextRef.current) {
			const rect = tooltipTextRef.current.getBoundingClientRect();
			// includes a cushion of 50 so that the tooltip text isn't right at the edge of the page
			setIsPositionedLeft(rect.right + 50 > window.innerWidth);
		}
	};

	useEffect(() => {
		checkPosition(); // check position on initial render

		// avoid unnecessary position checks during resize events
		const debouncedCheckPosition = debounce(checkPosition, 300);
		window.addEventListener('resize', debouncedCheckPosition); // update on resize

		// cleanup on component unmount
		return () => {
			debouncedCheckPosition.cancel();
			window.removeEventListener('resize', debouncedCheckPosition);
		};
	}, []);

	return (
		<div
			className={styles.tooltipContainer}
			aria-describedby="tooltip"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			<button
				aria-label={`Information for ${topic}`}
				onFocus={showTooltip}
				onBlur={hideTooltip}
			>
				<Icon name="info" size="x-small" />
			</button>

			<div
				ref={tooltipTextRef}
				id="tooltip"
				role="tooltip"
				className={`${styles.tooltip} ${isPositionedLeft ? styles.positionedLeft : ''} ${isVisible ? styles.isVisible : ''}`}
				aria-hidden={!isVisible}
			>
				{text}
			</div>
		</div>
	);
}

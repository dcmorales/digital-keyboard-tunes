// tooltip
// A tooltip component that displays an info icon. When hovered over
// or focused on, the tooltip text becomes visible. If the tooltip is too
// far to the right, the position will be updated to the left so that it
// isn't cut off from view.

'use client';

import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/icon';
import styles from './tooltip.module.scss';

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

	useEffect(() => {
		let resizeTimeout: NodeJS.Timeout;

		const checkPosition = (): void => {
			if (tooltipTextRef.current) {
				const rect = tooltipTextRef.current.getBoundingClientRect();
				setIsPositionedLeft(rect.right + 50 > window.innerWidth);
			}
		};

		const debouncedCheckPosition = () => {
			// clear any existing timeouts to ensure only the latest call is executed
			clearTimeout(resizeTimeout);

			// set a new timeout to execute checkPosition
			resizeTimeout = setTimeout(checkPosition, 300);
		};

		checkPosition(); // check position on initial render

		window.addEventListener('resize', debouncedCheckPosition); // update on resize

		// cleanup on component unmount
		return () => {
			clearTimeout(resizeTimeout);
			window.removeEventListener('resize', debouncedCheckPosition);
		};
	}, []);

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

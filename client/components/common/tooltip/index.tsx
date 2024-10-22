// tooltip
// A tooltip component that displays an info icon. When hovered over
// or focused on, the tooltip text becomes visible. If the tooltip is too
// far to the right, the position will be updated to the left so that it
// isn't cut off from view.

'use client';

import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/icon';
import styles from './tooltip.module.scss';

interface TooltipProps {
	topic: string;
	text: string;
}

export default function Tooltip({ topic, text }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isPositionedLeft, setIsPositionedLeft] = useState(false);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	const showTooltip = (): void => {
		setIsVisible(true);
	};

	const hideTooltip = (): void => {
		setIsVisible(false);
	};

	useEffect(() => {
		const checkPosition = () => {
			if (tooltipRef.current) {
				const rect = tooltipRef.current.getBoundingClientRect();
				setIsPositionedLeft(rect.right > window.innerWidth / 1.5);
			}
		};

		checkPosition(); // check position after render
		window.addEventListener('resize', checkPosition); // update on resize

		return () => {
			window.removeEventListener('resize', checkPosition);
		};
	}, [isVisible]);

	return (
		<div
			ref={tooltipRef}
			className={styles.tooltipContainer}
			aria-describedby="tooltip"
		>
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
					className={`${styles.tooltip} ${isPositionedLeft ? styles.positionedLeft : ''}`}
					aria-hidden={!isVisible}
				>
					{text}
				</div>
			)}
		</div>
	);
}

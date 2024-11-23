// tooltip
// A tooltip component that displays an info icon. When hovered over
// or focused on, the tooltip text becomes visible. If the tooltip is too
// far to the right, the position will be updated to the left so that it
// isn't cut off from view.

'use client';

import {
	cloneElement,
	isValidElement,
	type KeyboardEvent,
	type ReactElement,
	useCallback,
	useRef,
	useState,
} from 'react';

import CustomButton from '@/components/common/custom-button';
import Icon from '@/components/common/icon';
import { useResizeEffect } from '@/hooks/useResizeEffect';
import styles from './tooltip.module.scss';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipPropsBase {
	text: string;
	position?: TooltipPosition;
	widthInRem?: number;
}

export interface TooltipDefault extends TooltipPropsBase {
	topic: string;
	children?: never;
}

interface TooltipWithChildren extends TooltipPropsBase {
	children: ReactElement;
	topic?: never;
}

type TooltipProps = TooltipDefault | TooltipWithChildren;

export default function Tooltip({
	text,
	position = 'bottom',
	widthInRem = 7.5,
	topic,
	children,
}: TooltipProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isPositionedLeft, setIsPositionedLeft] = useState<boolean>(false);
	const tooltipTextRef = useRef<HTMLDivElement | null>(null);

	// if the tooltip text has screen overflow, reposition it
	const checkPosition = useCallback((): void => {
		if (tooltipTextRef.current) {
			const rect = tooltipTextRef.current.getBoundingClientRect();
			// includes a cushion of 50 so that the tooltip text isn't right at the edge of the page
			setIsPositionedLeft(rect.right + 50 > window.innerWidth);
		}
	}, []);

	// set initial position and update on resize
	useResizeEffect(checkPosition);

	const showTooltip = (): void => {
		setIsVisible(true);
	};

	const hideTooltip = (): void => {
		setIsVisible(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === 'Escape') {
			hideTooltip();
		}
	};

	// add event handlers to children if it's a valid React element
	const childrenWithHandlers = children
		? isValidElement(children)
			? cloneElement(children as ReactElement, {
					onFocus: showTooltip,
					onBlur: hideTooltip,
					onKeyDown: handleKeyDown,
				})
			: children
		: null;

	return (
		<div
			className={`${styles.tooltipContainer} ${!children ? styles.tooltipDefault : ''}`}
			aria-describedby="tooltip"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			{!children ? (
				<CustomButton
					className={styles.infoIcon}
					ariaLabel={`Information for ${topic}`}
					onClick={() => {}}
					onFocus={showTooltip}
					onBlur={hideTooltip}
					onKeyDown={handleKeyDown}
				>
					<Icon name="info" size="x-small" />
				</CustomButton>
			) : (
				childrenWithHandlers
			)}

			<div
				className={`${styles.tooltipTextContainer} ${isPositionedLeft ? styles.positionedLeft : ''} ${isVisible ? styles.isVisible : ''}`}
			>
				<div
					ref={tooltipTextRef}
					id="tooltip"
					role="tooltip"
					className={`${styles.tooltipText} ${styles[position]}`}
					style={{ width: `${widthInRem}rem` }}
					aria-hidden={!isVisible}
				>
					{text}
				</div>
			</div>
		</div>
	);
}

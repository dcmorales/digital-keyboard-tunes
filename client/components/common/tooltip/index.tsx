// tooltip
// A tooltip component that displays alongside either an info icon (default) or
// a valid child component (one that can handle the defined events). For the default
// tooltip, a topic is required; for tooltips with other valid children, ariaHidden may
// be applied to remove the tooltip from the accessibility tree. The tooltip's position
// and width can be customized. If autoDismiss is true, the tooltip will be dismissed on
// touch events after the specified time. When hovered over or focused on, the tooltip
// text becomes visible. If the default tooltip is too far to the right, the position will
// be updated to the left so that it isn't cut off from view.

'use client';

import {
	cloneElement,
	type FocusEvent,
	isValidElement,
	type KeyboardEvent,
	type MouseEvent,
	type ReactElement,
	type TouchEvent,
	useCallback,
	useEffect,
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
	autoDismiss?: boolean;
	secondsDisplayed?: number;
}

export interface TooltipDefault extends TooltipPropsBase {
	topic: string;
	children?: never;
	ariaHidden?: never;
}

interface TooltipWithChildren extends TooltipPropsBase {
	children: ReactElement;
	topic?: never;
	ariaHidden?: boolean;
}

type TooltipProps = TooltipDefault | TooltipWithChildren;

export default function Tooltip({
	text,
	position = 'bottom',
	widthInRem = 7.5,
	autoDismiss = false,
	secondsDisplayed = 5,
	topic,
	ariaHidden = false,
	children,
}: TooltipProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isPositionedLeft, setIsPositionedLeft] = useState<boolean>(false);
	const tooltipTextRef = useRef<HTMLDivElement | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

	// clean up on component unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const showTooltip = (event?: MouseEvent | FocusEvent | TouchEvent): void => {
		setIsVisible(true);

		// automatically dismiss tooltip on touch events if enabled
		if (autoDismiss && event && event.type === 'touchstart') {
			clearTimeout(timeoutRef.current!);

			timeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, secondsDisplayed * 1000);
		}
	};

	const hideTooltip = (): void => {
		setIsVisible(false);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
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
					onTouchStart: showTooltip,
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
					onTouchStart={showTooltip}
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
					aria-hidden={!isVisible || ariaHidden}
				>
					{text}
				</div>
			</div>
		</div>
	);
}

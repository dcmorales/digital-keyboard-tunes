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
	useEffect,
	useRef,
	useState,
} from 'react';

import Icon from '@/components/common/icon';
import { debounce } from '@/utils/debounce';
import styles from './tooltip.module.scss';
import CustomButton from '../custom-button';

interface TooltipPropsBase {
	text: string;
}

// also used in @values/settingsOptions
export interface TooltipDefault extends TooltipPropsBase {
	topic: string;
	children?: never;
}

interface TooltipWithChildren extends TooltipPropsBase {
	children: ReactElement;
	topic?: never;
}

type TooltipProps = TooltipDefault | TooltipWithChildren;

export default function Tooltip({ text, topic, children }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isPositionedLeft, setIsPositionedLeft] = useState(false);
	const tooltipTextRef = useRef<HTMLDivElement | null>(null);

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

	// if the tooltip text has screen overflow, reposition it
	const checkPosition = (): void => {
		if (tooltipTextRef.current) {
			const rect = tooltipTextRef.current.getBoundingClientRect();
			// includes a cushion of 50 so that the tooltip text isn't right at the edge of the page
			setIsPositionedLeft(rect.right + 50 > window.innerWidth);
		}
	};

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
					className={`${styles.infoIcon} ${isVisible ? styles.tooltipShowing : ''}`}
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

			<div className={styles.tooltipTextContainer}>
				<div
					ref={tooltipTextRef}
					id="tooltip"
					role="tooltip"
					className={`${styles.tooltipText} ${isPositionedLeft ? styles.positionedLeft : ''} ${isVisible ? styles.isVisible : ''}`}
					aria-hidden={!isVisible}
				>
					{text}
				</div>
			</div>
		</div>
	);
}

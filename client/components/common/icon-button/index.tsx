// icon-button

import CustomButton, {
	type CustomButtonProps,
} from '@/components/common/custom-button';
import Icon, { type IconProps } from '@/components/common/icon';
import Tooltip, { type TooltipPropsBase } from '@/components/common/tooltip';

interface IconButtonProps
	extends Omit<IconProps, 'name' | 'size'>,
		Omit<TooltipPropsBase, 'text' | 'position' | 'width'>,
		Omit<CustomButtonProps, 'children'> {
	icon: IconProps['name'];
	iconSize?: IconProps['size'];
	tooltipPosition?: TooltipPropsBase['position'];
	tooltipWidth?: TooltipPropsBase['widthInRem'];
	hasTooltip?: boolean;
}

export default function IconButton({
	icon,
	iconSize = 'large',
	tooltipPosition,
	tooltipWidth,
	hasTooltip,
	ariaLabel,
	disabled,
	onClick,
}: IconButtonProps): JSX.Element {
	const iconButtonContent = (
		<CustomButton ariaLabel={ariaLabel} disabled={disabled} onClick={onClick}>
			<Icon name={icon} size={iconSize} />
		</CustomButton>
	);

	if (!hasTooltip) {
		return iconButtonContent;
	}

	return (
		<Tooltip
			position={tooltipPosition}
			text={ariaLabel}
			widthInRem={tooltipWidth}
			secondsDisplayed={1.5}
			autoDismiss
			ariaHidden
		>
			{iconButtonContent}
		</Tooltip>
	);
}

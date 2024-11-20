// icon-button

import CustomButton from '@/components/common/custom-button';
import Icon, { IconProps } from '@/components/common/icon';
import type { CustomButtonProps } from '@/components/common/custom-button';
import Tooltip, { type TooltipPropsBase } from '@/components/common/tooltip';

interface IconButtonProps
	extends Omit<IconProps, 'name' | 'size'>,
		Omit<TooltipPropsBase, 'text' | 'position' | 'width'>,
		Omit<CustomButtonProps, 'children'> {
	icon: IconProps['name'];
	iconSize?: IconProps['size'];
	tooltipPosition?: TooltipPropsBase['position'];
	tooltipText?: TooltipPropsBase['text'];
	tooltipWidth?: TooltipPropsBase['widthInRem'];
}

export default function IconButton({
	icon,
	iconSize,
	tooltipPosition,
	tooltipText,
	tooltipWidth,
	ariaLabel,
	disabled,
	onClick,
}: IconButtonProps): JSX.Element {
	return (
		<Tooltip
			position={tooltipPosition}
			text={tooltipText ? tooltipText : ariaLabel}
			widthInRem={tooltipWidth}
		>
			<CustomButton ariaLabel={ariaLabel} disabled={disabled} onClick={onClick}>
				<Icon name={icon} size={iconSize ? iconSize : 'large'} />
			</CustomButton>
		</Tooltip>
	);
}

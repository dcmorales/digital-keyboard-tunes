// icon-button

import CustomButton from '@/components/common/custom-button';
import Icon, { IconProps } from '@/components/common/icon';
import Tooltip, { type TooltipPosition } from '@/components/common/tooltip';

interface IconButtonProps extends Omit<IconProps, 'name' | 'size'> {
	icon: IconProps['name'];
	iconSize?: IconProps['size'];
	tooltipPosition?: TooltipPosition;
	tooltipText?: string;
	tooltipWidth?: string;
	ariaLabel: string;
	disabled?: boolean;
	onClick: () => void;
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
			width={tooltipWidth}
		>
			<CustomButton ariaLabel={ariaLabel} disabled={disabled} onClick={onClick}>
				<Icon name={icon} size={iconSize ? iconSize : 'large'} />
			</CustomButton>
		</Tooltip>
	);
}

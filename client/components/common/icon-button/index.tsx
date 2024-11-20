// icon-button

import CustomButton from '@/components/common/custom-button';
import Icon, { IconProps } from '@/components/common/icon';
import Tooltip, { type TooltipPosition } from '@/components/common/tooltip';

interface IconButtonProps extends Omit<IconProps, 'name' | 'size'> {
	icon: IconProps['name'];
	iconSize?: IconProps['size'];
	tooltipText?: string;
	tooltipPosition?: TooltipPosition;
	ariaLabel: string;
	disabled?: boolean;
	onClick: () => void;
}

export default function IconButton({
	icon,
	iconSize,
	tooltipText,
	tooltipPosition,
	ariaLabel,
	disabled,
	onClick,
}: IconButtonProps): JSX.Element {
	return (
		<Tooltip
			text={tooltipText ? tooltipText : ariaLabel}
			position={tooltipPosition}
		>
			<CustomButton ariaLabel={ariaLabel} disabled={disabled} onClick={onClick}>
				<Icon name={icon} size={iconSize ? iconSize : 'large'} />
			</CustomButton>
		</Tooltip>
	);
}

// icon-button
// A button that displays an icon. The icon, ariaLabel, and onClick handler are the only
// required props. It can display as is or with a tooltip (if the icon's meaning is not
// immediately clear). The tooltip props can be customized, otherwise they will default
// to values in Tooltip. If the button has a tooltip, it will be automatically dismissed
// after 1.5 seconds after touch events. Tooltip text will be the same as the aria-label.

import CustomButton, {
	type CustomButtonProps,
} from '@/components/common/custom-button';
import Icon, { type IconProps } from '@/components/common/icon';
import Tooltip, { type TooltipPropsBase } from '@/components/common/tooltip';

interface IconButtonPropsBase
	extends Omit<IconProps, 'name' | 'size'>,
		Omit<CustomButtonProps, 'children'> {
	icon: IconProps['name'];
	iconSize?: IconProps['size'];
}

interface IconButtonWithoutTooltip extends IconButtonPropsBase {
	tooltipPosition?: never;
	tooltipWidth?: never;
	hasTooltip?: false;
}

interface IconButtonWithTooltip
	extends Omit<TooltipPropsBase, 'text' | 'position' | 'width'>,
		IconButtonPropsBase {
	tooltipPosition?: TooltipPropsBase['position'];
	tooltipWidth?: TooltipPropsBase['widthInRem'];
	hasTooltip?: true;
}

type IconButtonProps = IconButtonWithoutTooltip | IconButtonWithTooltip;

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

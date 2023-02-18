/**
 * External dependencies
 */
import { useCheckoutSubmit } from '@woocommerce/base-context/hooks';
import { Icon, check } from '@wordpress/icons';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';
interface PlaceOrderButton {
	label: string;
	className?: string;
}

const PlaceOrderButton = ( {
	label,
	className,
}: PlaceOrderButton ): JSX.Element => {
	const {
		onSubmit,
		isCalculating,
		isDisabled,
		waitingForProcessing,
		waitingForRedirect,
	} = useCheckoutSubmit();

	return (
		<Button
			className={ classNames(
				'wc-block-components-checkout-place-order-button',
				className
			) }
			onClick={ onSubmit }
			disabled={
				isCalculating ||
				isDisabled ||
				waitingForProcessing ||
				waitingForRedirect
			}
			showSpinner={ waitingForProcessing }
		>
			{ waitingForRedirect ? <Icon icon={ check } /> : label }
		</Button>
	);
};

export default PlaceOrderButton;

/**
 * External dependencies
 */
import { CHECKOUT_STORE_KEY, PAYMENT_STORE_KEY } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { __experimentalApplyCheckoutFilter } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useCheckoutEventsContext } from '../providers';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { usePaymentMethodDataContext } from '../providers/cart-checkout/payment-methods';
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
>>>>>>> 4ff656e4c (Feature: Data Store Migration - Payments (#6619))
import { usePaymentMethods } from './payment-methods/use-payment-methods';

/**
 * Returns the submitButtonText, onSubmit interface from the checkout context,
 * and an indication of submission status.
 */
export const useCheckoutSubmit = () => {
	const {
		isCalculating,
		isBeforeProcessing,
		isProcessing,
		isAfterProcessing,
		isComplete,
		hasError,
	} = useSelect( ( select ) => {
		const store = select( CHECKOUT_STORE_KEY );
		return {
			isCalculating: store.isCalculating(),
			isBeforeProcessing: store.isBeforeProcessing(),
			isProcessing: store.isProcessing(),
			isAfterProcessing: store.isAfterProcessing(),
			isComplete: store.isComplete(),
			hasError: store.hasError(),
		};
	} );
<<<<<<< HEAD
	const { activePaymentMethod, isExpressPaymentMethodActive } = useSelect(
		( select ) => {
			const store = select( PAYMENT_STORE_KEY );
=======
	const { currentStatus: paymentStatus, activePaymentMethod } = useSelect(
		( select ) => {
			const store = select( PAYMENT_METHOD_DATA_STORE_KEY );

			return {
				currentStatus: store.getCurrentStatus(),
				activePaymentMethod: store.getActivePaymentMethod(),
			};
		}
	);
>>>>>>> 4ff656e4c (Feature: Data Store Migration - Payments (#6619))

<<<<<<< HEAD
			return {
				activePaymentMethod: store.getActivePaymentMethod(),
				isExpressPaymentMethodActive:
					store.isExpressPaymentMethodActive(),
			};
		}
	);

=======
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	const { onSubmit } = useCheckoutEventsContext();

	const { paymentMethods = {} } = usePaymentMethods();
	const paymentMethod = paymentMethods[ activePaymentMethod ] || {};
	const waitingForProcessing =
		isProcessing || isAfterProcessing || isBeforeProcessing;
	const waitingForRedirect = isComplete && ! hasError;
	const defaultLabel =
		paymentMethod.placeOrderButtonLabel ||
		__( 'Place Order', 'woo-gutenberg-products-block' );
	const label = __experimentalApplyCheckoutFilter( {
		filterName: 'placeOrderButtonLabel',
		defaultValue: defaultLabel,
	} );

	return {
		submitButtonText: label,
		onSubmit,
		isCalculating,
		isDisabled: isProcessing || isExpressPaymentMethodActive,
		waitingForProcessing,
		waitingForRedirect,
	};
};

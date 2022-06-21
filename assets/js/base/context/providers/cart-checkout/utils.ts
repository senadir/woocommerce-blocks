/**
 * External dependencies
 */
import triggerFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Utility function for preparing payment data for the request.
 */
export const preparePaymentData = (
	//Arbitrary payment data provided by the payment method.
	paymentData: Record< string, unknown >,
	//Whether to save the payment method info to user account.
	shouldSave: boolean,
	//The current active payment method.
	activePaymentMethod: string
): { key: string; value: unknown }[] => {
	const apiData = Object.keys( paymentData ).map( ( property ) => {
		const value = paymentData[ property ];
		return { key: property, value };
	}, [] );
	const savePaymentMethodKey = `wc-${ activePaymentMethod }-new-payment-method`;
	apiData.push( {
		key: savePaymentMethodKey,
		value: shouldSave,
	} );
	return apiData;
};

/**
 * Process headers from an API response an dispatch updates.
 */
export const processCheckoutResponseHeaders = ( headers: Headers ): void => {
<<<<<<< HEAD
	const { __internalSetCustomerId } = dispatch( CHECKOUT_STORE_KEY );
=======
	const { setCustomerId } = dispatch( CHECKOUT_STORE_KEY );
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	if (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		triggerFetch.setNonce &&
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		typeof triggerFetch.setNonce === 'function'
	) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		triggerFetch.setNonce( headers );
	}

	// Update user using headers.
	if ( headers?.get( 'User-ID' ) ) {
		__internalSetCustomerId(
			parseInt( headers.get( 'User-ID' ) || '0', 10 )
		);
	}
};

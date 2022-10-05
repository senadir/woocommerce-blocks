/**
 * External dependencies
 */
import type { CheckoutResponse } from '@woocommerce/types';
import { store as noticesStore } from '@wordpress/notices';
import { dispatch as wpDispatch, select as wpSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../payment/constants';
import { removeNoticesByStatus } from '../../utils/notices';
import {
	getPaymentResultFromCheckoutResponse,
	runCheckoutAfterProcessingWithErrorObservers,
	runCheckoutAfterProcessingWithSuccessObservers,
} from './utils';
import {
	EVENTS,
	emitEvent,
	emitEventWithAbort,
} from '../../base/context/providers/cart-checkout/checkout-events/event-emit';
import type {
	emitValidateEventType,
	emitAfterProcessingEventsType,
} from './types';
import type { DispatchFromMap } from '../mapped-types';
import * as actions from './actions';

/**
 * Based on the result of the payment, update the redirect url,
 * set the payment processing response in the checkout data store
 * and change the status to AFTER_PROCESSING
 */
<<<<<<< HEAD
<<<<<<< HEAD
export const __internalProcessCheckoutResponse = (
	response: CheckoutResponse
) => {
=======
export const processCheckoutResponse = ( response: CheckoutResponse ) => {
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
export const __internalProcessCheckoutResponse = (
	response: CheckoutResponse
) => {
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
	return ( {
		dispatch,
	}: {
		dispatch: DispatchFromMap< typeof actions >;
	} ) => {
		const paymentResult = getPaymentResultFromCheckoutResponse( response );
<<<<<<< HEAD
<<<<<<< HEAD
		dispatch.__internalSetRedirectUrl( paymentResult?.redirectUrl || '' );
		// The local `dispatch` here is bound  to the actions of the data store. We need to use the global dispatch here
		// to dispatch an action on a different store.
		wpDispatch( PAYMENT_STORE_KEY ).__internalSetPaymentResult(
			paymentResult
		);
		dispatch.__internalSetAfterProcessing();
=======
		dispatch.setRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.setProcessingResponse( paymentResult );
		dispatch.setAfterProcessing();
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
		dispatch.__internalSetRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.__internalSetPaymentResult( paymentResult );
		dispatch.__internalSetAfterProcessing();
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
	};
};

/**
 * Emit the CHECKOUT_VALIDATION_BEFORE_PROCESSING event and process all
 * registered observers
 */
<<<<<<< HEAD
<<<<<<< HEAD
export const __internalEmitValidateEvent: emitValidateEventType = ( {
=======
export const emitValidateEvent: emitValidateEventType = ( {
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
export const __internalEmitValidateEvent: emitValidateEventType = ( {
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
	observers,
	setValidationErrors, // TODO: Fix this type after we move to validation store
} ) => {
	return ( { dispatch, registry } ) => {
		const { createErrorNotice } = registry.dispatch( noticesStore );
		removeNoticesByStatus( 'error' );
		emitEvent(
			observers,
			EVENTS.CHECKOUT_VALIDATION_BEFORE_PROCESSING,
			{}
		).then( ( response ) => {
			if ( response !== true ) {
				if ( Array.isArray( response ) ) {
					response.forEach(
						( { errorMessage, validationErrors } ) => {
							createErrorNotice( errorMessage, {
								context: 'wc/checkout',
							} );
							setValidationErrors( validationErrors );
						}
					);
				}
<<<<<<< HEAD
<<<<<<< HEAD
				dispatch.__internalSetIdle();
				dispatch.__internalSetHasError();
			} else {
				dispatch.__internalSetProcessing();
=======
				dispatch.setIdle();
				dispatch.setHasError();
			} else {
				dispatch.setProcessing();
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
				dispatch.__internalSetIdle();
				dispatch.__internalSetHasError();
			} else {
				dispatch.__internalSetProcessing();
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
			}
		} );
	};
};

/**
 * Emit the CHECKOUT_AFTER_PROCESSING_WITH_ERROR if the checkout contains an error,
 * or the CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS if not. Set checkout errors according
 * to the observer responses
 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
export const __internalEmitAfterProcessingEvents: emitAfterProcessingEventsType =
	( { observers, notices } ) => {
		return ( { select, dispatch, registry } ) => {
			const { createErrorNotice } = registry.dispatch( noticesStore );
			const checkoutState = select.getCheckoutState();
			const data = {
				redirectUrl: checkoutState.redirectUrl,
				orderId: checkoutState.orderId,
				customerId: checkoutState.customerId,
				orderNotes: checkoutState.orderNotes,
				processingResponse:
					wpSelect( PAYMENT_STORE_KEY ).getPaymentResult(),
			};
			if ( checkoutState.hasError ) {
				// allow payment methods or other things to customize the error
				// with a fallback if nothing customizes it.
				emitEventWithAbort(
					observers,
					EVENTS.CHECKOUT_AFTER_PROCESSING_WITH_ERROR,
					data
				).then( ( observerResponses ) => {
					runCheckoutAfterProcessingWithErrorObservers( {
						observerResponses,
						notices,
						dispatch,
						createErrorNotice,
						data,
					} );
				} );
			} else {
				emitEventWithAbort(
					observers,
					EVENTS.CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS,
					data
				).then( ( observerResponses: unknown[] ) => {
					runCheckoutAfterProcessingWithSuccessObservers( {
						observerResponses,
						dispatch,
						createErrorNotice,
					} );
				} );
			}
<<<<<<< HEAD
		};
	};
=======
export const emitAfterProcessingEvents: emitAfterProcessingEventsType = ( {
	observers,
	notices,
} ) => {
	return ( { select, dispatch, registry } ) => {
		const { createErrorNotice } = registry.dispatch( noticesStore );
		const state = select.getCheckoutState();
		const data = {
			redirectUrl: state.redirectUrl,
			orderId: state.orderId,
			customerId: state.customerId,
			orderNotes: state.orderNotes,
			processingResponse: state.processingResponse,
=======
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
		};
	};
<<<<<<< HEAD
};
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))

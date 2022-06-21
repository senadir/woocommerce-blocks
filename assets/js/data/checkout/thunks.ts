/**
 * External dependencies
 */
import type { CheckoutResponse } from '@woocommerce/types';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
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
export const __internalProcessCheckoutResponse = (
	response: CheckoutResponse
) => {
=======
export const processCheckoutResponse = ( response: CheckoutResponse ) => {
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	return ( {
		dispatch,
	}: {
		dispatch: DispatchFromMap< typeof actions >;
	} ) => {
		const paymentResult = getPaymentResultFromCheckoutResponse( response );
<<<<<<< HEAD
		dispatch.__internalSetRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.__internalSetPaymentResult( paymentResult );
		dispatch.__internalSetAfterProcessing();
=======
		dispatch.setRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.setProcessingResponse( paymentResult );
		dispatch.setAfterProcessing();
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	};
};

/**
 * Emit the CHECKOUT_VALIDATION_BEFORE_PROCESSING event and process all
 * registered observers
 */
<<<<<<< HEAD
export const __internalEmitValidateEvent: emitValidateEventType = ( {
=======
export const emitValidateEvent: emitValidateEventType = ( {
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
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
export const __internalEmitAfterProcessingEvents: emitAfterProcessingEventsType =
	( { observers, notices } ) => {
		return ( { select, dispatch, registry } ) => {
			const { createErrorNotice } = registry.dispatch( noticesStore );
			const state = select.getCheckoutState();
			const data = {
				redirectUrl: state.redirectUrl,
				orderId: state.orderId,
				customerId: state.customerId,
				orderNotes: state.orderNotes,
				processingResponse: state.paymentResult,
			};
			if ( state.hasError ) {
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
		};
		if ( state.hasError ) {
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
	};
};
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))

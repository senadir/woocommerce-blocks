/**
 * External dependencies
 */
import type { Notice } from '@wordpress/notices/';
import { DataRegistry } from '@wordpress/data';

/**
 * Internal dependencies
 */
import type { EventObserversType } from '../../base/context/event-emit/types';
import type { CheckoutState } from './default-state';
import type { DispatchFromMap, SelectFromMap } from '../mapped-types';
import * as selectors from './selectors';
import * as actions from './actions';
<<<<<<< HEAD
<<<<<<< HEAD
import { FieldValidationStatus } from '../types';
=======
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
import { FieldValidationStatus } from '../types';
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))

export type CheckoutAfterProcessingWithErrorEventData = {
	redirectUrl: CheckoutState[ 'redirectUrl' ];
	orderId: CheckoutState[ 'orderId' ];
	customerId: CheckoutState[ 'customerId' ];
	orderNotes: CheckoutState[ 'orderNotes' ];
<<<<<<< HEAD
	processingResponse: CheckoutState[ 'paymentResult' ];
=======
	processingResponse: CheckoutState[ 'processingResponse' ];
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
};
export type CheckoutAndPaymentNotices = {
	checkoutNotices: Notice[];
	paymentNotices: Notice[];
	expressPaymentNotices: Notice[];
};

/**
 * Type for emitAfterProcessingEventsType() thunk
 */
export type emitAfterProcessingEventsType = ( {
	observers,
	notices,
}: {
	observers: EventObserversType;
	notices: CheckoutAndPaymentNotices;
} ) => ( {
	select,
	dispatch,
	registry,
}: {
	select: SelectFromMap< typeof selectors >;
	dispatch: DispatchFromMap< typeof actions >;
	registry: DataRegistry;
} ) => void;

/**
 * Type for emitValidateEventType() thunk
 */
export type emitValidateEventType = ( {
	observers,
	setValidationErrors,
}: {
	observers: EventObserversType;
<<<<<<< HEAD
<<<<<<< HEAD
	setValidationErrors: (
		errors: Record< string, FieldValidationStatus >
	) => void;
=======
	setValidationErrors: ( errors: Array< unknown > ) => void;
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
=======
	setValidationErrors: (
		errors: Record< string, FieldValidationStatus >
	) => void;
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
} ) => ( {
	dispatch,
	registry,
}: {
	dispatch: DispatchFromMap< typeof actions >;
	registry: DataRegistry;
} ) => void;

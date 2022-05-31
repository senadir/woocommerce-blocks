/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useRef } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useThrowError } from '@woocommerce/base-hooks';
import { SelectShippingRateType } from '@woocommerce/type-defs/shipping';

/**
 * Internal dependencies
 */
import { useStoreEvents } from '../use-store-events';

/**
 * This is a custom hook for selecting shipping rates for a shipping package.
 *
 * @return {Object} This hook will return an object with these properties:
 * 		- selectShippingRate: A function that immediately returns the selected rate and dispatches an action generator.
 *		- isSelectingRate: True when rates are being resolved to the API.
 */
export const useSelectShippingRate = (): SelectShippingRateType => {
	const throwError = useThrowError();
	const { dispatchCheckoutEvent } = useStoreEvents();
	// See if rates are being selected.
	const isSelectingRate = useSelect< boolean >( ( select ) => {
		return select( storeKey ).isShippingRateBeingSelected();
	}, [] );
	const { selectShippingRate: dispatchSelectShippingRate } = useDispatch(
		storeKey
	) as {
		selectShippingRate: (
			newShippingRateId: string,
			packageId: string | number,
			controller: AbortSignal
		) => Promise< unknown >;
	};

	// create a new abort controller.
	const controller = useRef( new AbortController() );
	// Selects a shipping rate, fires an event, and catch any errors.
	const selectShippingRate = useCallback(
		( newShippingRateId, packageId ) => {
			// If we're already selecting, let's cancel the previous rate and create a new controller.
			if ( isSelectingRate ) {
				controller.current.abort();
				// We need to create a new controller becasue the previous one is already canceled.
				controller.current = new AbortController();
			}

			dispatchSelectShippingRate(
				newShippingRateId,
				packageId,
				controller.current.signal
			)
				.then( () => {
					dispatchCheckoutEvent( 'set-selected-shipping-rate', {
						shippingRateId: newShippingRateId,
					} );
				} )
				.catch( ( error ) => {
					// Throw an error because an error when selecting a rate is problematic.
					throwError( error );
				} );
		},
		[
			dispatchSelectShippingRate,
			isSelectingRate,
			dispatchCheckoutEvent,
			throwError,
		]
	);

	return {
		selectShippingRate,
		isSelectingRate,
	};
};

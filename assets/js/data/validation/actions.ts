/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { ReturnOrGeneratorYieldUnion } from '../mapped-types';
import { FieldValidationStatus } from '../types';

export const setValidationErrors = (
	errors: Record< string, FieldValidationStatus >
) => ( {
	type: types.SET_VALIDATION_ERRORS,
	errors,
} );

/**
 * Clears validation errors for the given ids.
 *
 * @param  errors Array of error ids to clear.
 */
export const clearValidationErrors = ( errors?: string[] | undefined ) => ( {
	type: types.CLEAR_VALIDATION_ERRORS,
	errors,
} );

export const clearAllValidationErrors = () => {
	deprecated( 'clearAllValidationErrors', {
		version: '9.0.0',
		alternative: 'clearValidationErrors',
		plugin: 'WooCommerce Blocks',
		link: 'https://github.com/woocommerce/woocommerce-blocks/pull/7601',
		hint: 'Calling `clearValidationErrors` with no arguments will clear all validation errors.',
	} );

	// Return clearValidationErrors which will clear all errors by defaults if no error ids are passed.
	return clearValidationErrors();
};

export const clearValidationError = ( error: string ) => ( {
	type: types.CLEAR_VALIDATION_ERROR,
	error,
} );
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
=======

>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
export const hideValidationError = ( error: string ) => ( {
	type: types.HIDE_VALIDATION_ERROR,
	error,
} );
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
=======

>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
export const showValidationError = ( error: string ) => ( {
	type: types.SHOW_VALIDATION_ERROR,
	error,
} );
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))

export const showAllValidationErrors = () => ( {
	type: types.SHOW_ALL_VALIDATION_ERRORS,
} );

<<<<<<< HEAD
=======
export const showAllValidationErrors = () => ( {
	type: types.SHOW_ALL_VALIDATION_ERRORS,
} );
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
=======
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
export type ValidationAction = ReturnOrGeneratorYieldUnion<
	| typeof setValidationErrors
	| typeof clearAllValidationErrors
	| typeof clearValidationError
	| typeof clearValidationErrors
	| typeof hideValidationError
	| typeof showValidationError
	| typeof showAllValidationErrors
>;

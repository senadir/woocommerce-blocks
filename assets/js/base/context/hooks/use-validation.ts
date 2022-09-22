/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';
import type {
	ValidationData,
	ValidationContextError,
} from '@woocommerce/type-defs/contexts';
import { useDispatch, useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Custom hook for setting for adding errors to the validation system.
 */
export const useValidation = (): ValidationData => {
<<<<<<< HEAD
	const { clearValidationError, hideValidationError, setValidationErrors } =
		useDispatch( VALIDATION_STORE_KEY );

<<<<<<< HEAD
=======
	const {
		clearValidationError,
		hideValidationError,
		setValidationErrors,
	} = useDispatch( VALIDATION_STORE_KEY );
=======
	const prefix = 'extensions-errors';

>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146))
	const { hasValidationErrors, getValidationError } = useSelect(
		( mapSelect ) => {
			const store = mapSelect( VALIDATION_STORE_KEY );
			return {
				hasValidationErrors: store.hasValidationErrors(),
				getValidationError: ( validationErrorId: string ) =>
					store.getValidationError(
						`${ prefix }-${ validationErrorId }`
					),
			};
		}
	);
<<<<<<< HEAD
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
	const prefix = 'extensions-errors';
=======
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146))

	const { hasValidationErrors, getValidationError } = useSelect(
		( mapSelect ) => {
			const store = mapSelect( VALIDATION_STORE_KEY );
			return {
				hasValidationErrors: store.hasValidationErrors(),
				getValidationError: ( validationErrorId: string ) =>
					store.getValidationError(
						`${ prefix }-${ validationErrorId }`
					),
			};
		}
	);

	return {
<<<<<<< HEAD
<<<<<<< HEAD
		hasValidationErrors,
		getValidationError,
=======
		hasValidationErrors: hasValidationErrors(),
		getValidationError: useCallback(
			( validationErrorId: string ) =>
				getValidationError( `${ prefix }-${ validationErrorId }` ),
			[ getValidationError ]
		),
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
=======
		hasValidationErrors,
		getValidationError,
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146))
		clearValidationError: useCallback(
			( validationErrorId: string ) =>
				clearValidationError( `${ prefix }-${ validationErrorId }` ),
			[ clearValidationError ]
		),
		hideValidationError: useCallback(
			( validationErrorId: string ) =>
				hideValidationError( `${ prefix }-${ validationErrorId }` ),
			[ hideValidationError ]
		),
		setValidationErrors: useCallback(
			( errorsObject: Record< string, ValidationContextError > ) =>
				setValidationErrors(
					Object.fromEntries(
						Object.entries( errorsObject ).map(
							( [ validationErrorId, error ] ) => [
								`${ prefix }-${ validationErrorId }`,
								error,
							]
						)
					)
				),
			[ setValidationErrors ]
		),
	};
};

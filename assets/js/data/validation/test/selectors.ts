/**
 * Internal dependencies
 */
import {
	getValidationErrorId,
	getValidationError,
	hasValidationErrors,
} from '../selectors';
import { FieldValidationStatus } from '../../types';

describe( 'Validation selectors', () => {
	it( 'Gets the validation error', () => {
		const state: Record< string, FieldValidationStatus > = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
<<<<<<< HEAD
		const validationError = getValidationError( state, 'validationError' );
=======
		const validationError = getValidationError( state )(
			'validationError'
		);
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
		expect( validationError ).toEqual( {
			message: 'This is a test message',
			hidden: false,
		} );
	} );

	it( 'Gets the generated validation error ID', () => {
		const state: Record< string, FieldValidationStatus > = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
<<<<<<< HEAD
		const validationErrorID = getValidationErrorId(
			state,
=======
		const validationErrorID = getValidationErrorId( state )(
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
			'validationError'
		);
		expect( validationErrorID ).toEqual( `validate-error-validationError` );
	} );

	it( 'Checks if state has any validation errors', () => {
		const state: Record< string, FieldValidationStatus > = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
		const validationErrors = hasValidationErrors( state );
		expect( validationErrors ).toEqual( true );
		const stateWithNoErrors: Record< string, FieldValidationStatus > = {};
<<<<<<< HEAD
		const stateWithNoErrorsCheckResult =
			hasValidationErrors( stateWithNoErrors );
=======
		const stateWithNoErrorsCheckResult = hasValidationErrors(
			stateWithNoErrors
		);
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
		expect( stateWithNoErrorsCheckResult ).toEqual( false );
	} );
} );

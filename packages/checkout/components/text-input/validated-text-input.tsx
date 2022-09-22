/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
import {
	useCallback,
	useRef,
	useEffect,
	useState,
	InputHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { withInstanceId } from '@wordpress/compose';
import { isObject, isString } from '@woocommerce/types';
import { useDispatch, useSelect } from '@wordpress/data';
=======
import { useCallback, useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import { withInstanceId } from '@wordpress/compose';
import { isString } from '@woocommerce/types';
import { dispatch, useSelect } from '@wordpress/data';
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402)):assets/js/base/components/text-input/validated-text-input.tsx
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import TextInput from './text-input';
import './style.scss';
import { ValidationInputError } from '../validation-input-error';

<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
interface ValidatedTextInputProps
	extends Omit<
		InputHTMLAttributes< HTMLInputElement >,
		'onChange' | 'onBlur'
	> {
	id?: string;
	instanceId: string;
	className?: string | undefined;
	ariaDescribedBy?: string | undefined;
=======
interface ValidatedTextInputProps {
	id?: string;
	instanceId: string;
	className?: string;
	ariaDescribedBy?: string;
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402)):assets/js/base/components/text-input/validated-text-input.tsx
	errorId?: string;
	focusOnMount?: boolean;
	showError?: boolean;
	errorMessage?: string | undefined;
	onChange: ( newValue: string ) => void;
	label?: string | undefined;
	value: string;
}

const ValidatedTextInput = ( {
	className,
	instanceId,
	id,
	ariaDescribedBy,
	errorId,
	focusOnMount = false,
	onChange,
	showError = true,
	errorMessage: passedErrorMessage = '',
	value = '',
	...rest
}: ValidatedTextInputProps ): JSX.Element => {
	const [ isPristine, setIsPristine ] = useState( true );
	const inputRef = useRef< HTMLInputElement >( null );

	const { setValidationErrors, hideValidationError, clearValidationError } =
<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
		useDispatch( VALIDATION_STORE_KEY );
=======
		dispatch( VALIDATION_STORE_KEY );
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402)):assets/js/base/components/text-input/validated-text-input.tsx
	const textInputId =
		typeof id !== 'undefined' ? id : 'textinput-' + instanceId;
	const errorIdString = errorId !== undefined ? errorId : textInputId;

<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
=======
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146)):assets/js/base/components/text-input/validated-text-input.tsx
	const { validationError, validationErrorId } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			validationError: store.getValidationError( errorIdString ),
			validationErrorId: store.getValidationErrorId( errorIdString ),
		};
	} );
<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
=======
	const { getValidationError, getValidationErrorId } = useSelect(
		( select ) => {
			const store = select( VALIDATION_STORE_KEY );
			return {
				getValidationError: store.getValidationError(),
				getValidationErrorId: store.getValidationErrorId(),
			};
		}
	);
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402)):assets/js/base/components/text-input/validated-text-input.tsx
=======
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146)):assets/js/base/components/text-input/validated-text-input.tsx

	const validateInput = useCallback(
		( errorsHidden = true ) => {
			const inputObject = inputRef.current || null;
			if ( ! inputObject ) {
				return;
			}
			// Trim white space before validation.
			inputObject.value = inputObject.value.trim();
			const inputIsValid = inputObject.checkValidity();
			if ( inputIsValid ) {
				clearValidationError( errorIdString );
			} else {
				const validationErrors = {
					[ errorIdString ]: {
						message:
							inputObject.validationMessage ||
							__(
								'Invalid value.',
								'woo-gutenberg-products-block'
							),
						hidden: errorsHidden,
					},
				};
				setValidationErrors( validationErrors );
			}
		},
		[ clearValidationError, errorIdString, setValidationErrors ]
	);

	/**
	 * Focus on mount
	 *
	 * If the input is in pristine state, focus the element.
	 */
	useEffect( () => {
		if ( isPristine && focusOnMount ) {
			inputRef.current?.focus();
		}
		setIsPristine( false );
	}, [ focusOnMount, isPristine, setIsPristine ] );

	/**
	 * Value Validation
	 *
	 * Runs validation on state change if the current element is not in focus. This is because autofilled elements do not
	 * trigger the blur() event, and so values can be validated in the background if the state changes elsewhere.
	 */
	useEffect( () => {
		if (
			inputRef.current?.ownerDocument?.activeElement !== inputRef.current
		) {
			validateInput( true );
		}
		// We need to track value even if it is not directly used so we know when it changes.
	}, [ value, validateInput ] );

	// Remove validation errors when unmounted.
	useEffect( () => {
		return () => {
			clearValidationError( errorIdString );
		};
	}, [ clearValidationError, errorIdString ] );

<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
	if (
		isString( passedErrorMessage ) &&
		passedErrorMessage !== '' &&
		isObject( passedErrorMessage )
	) {
		validationError.message = passedErrorMessage;
	}

	const hasError = validationError?.message && ! validationError?.hidden;
=======
	const errorMessage = getValidationError( errorIdString );

=======
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146)):assets/js/base/components/text-input/validated-text-input.tsx
	if ( isString( passedErrorMessage ) && passedErrorMessage !== '' ) {
		validationError.message = passedErrorMessage;
	}

<<<<<<< HEAD:packages/checkout/components/text-input/validated-text-input.tsx
	const hasError = errorMessage?.message && ! errorMessage?.hidden;
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402)):assets/js/base/components/text-input/validated-text-input.tsx
=======
	const hasError = validationError?.message && ! validationError?.hidden;
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146)):assets/js/base/components/text-input/validated-text-input.tsx
	const describedBy =
		showError && hasError && validationErrorId
			? validationErrorId
			: ariaDescribedBy;

	return (
		<TextInput
			className={ classnames( className, {
				'has-error': hasError,
			} ) }
			aria-invalid={ hasError === true }
			id={ textInputId }
			onBlur={ () => {
				validateInput( false );
			} }
			feedback={
				showError && (
					<ValidationInputError
						errorMessage={ passedErrorMessage }
						propertyName={ errorIdString }
					/>
				)
			}
			ref={ inputRef }
			onChange={ ( val ) => {
				hideValidationError( errorIdString );
				onChange( val );
			} }
			ariaDescribedBy={ describedBy }
			value={ value }
			{ ...rest }
		/>
	);
};
export const __ValidatedTexInputWithoutId = ValidatedTextInput;
export default withInstanceId( ValidatedTextInput );

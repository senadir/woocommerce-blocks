/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { SelectControl } from 'wordpress-components';
import { useEffect } from 'react';
import classnames from 'classnames';
import { ValidationInputError } from '@woocommerce/blocks-checkout';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';
import { useDispatch, useSelect } from '@wordpress/data';

// Default option for select boxes.
const selectAnOption = {
	value: '',
	label: __( 'Select an option', 'woo-gutenberg-products-block' ),
};

/**
 * VariationAttributeSelect component.
 *
 * @param {*} props Component props.
 */
const AttributeSelectControl = ( {
	attributeName,
	options = [],
	value = '',
	onChange = () => {},
	errorMessage = __(
		'Please select a value.',
		'woo-gutenberg-products-block'
	),
} ) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
	const { setValidationErrors, clearValidationError } = useDispatch(
		VALIDATION_STORE_KEY
	);
=======
=======
	const errorId = attributeName;

>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146))
	const { setValidationErrors, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );
>>>>>>> 4ff656e4c (Feature: Data Store Migration - Payments (#6619))

	const { error } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			error: store.getValidationError( errorId ) || {},
		};
	} );
<<<<<<< HEAD
>>>>>>> 0cfb0ee6d (Convert validation context to data store (#6402))
	const errorId = attributeName;

	const { setValidationErrors, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );

	const { error } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			error: store.getValidationError( errorId ) || {},
		};
	} );
=======
>>>>>>> 257114e23 (Refactor `getValidationError` and `getValidationErrorId` selectors in `wc/store/validation` data store (#7146))

	useEffect( () => {
		if ( value ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message: errorMessage,
					hidden: true,
				},
			} );
		}
	}, [
		value,
		errorId,
		errorMessage,
		clearValidationError,
		setValidationErrors,
	] );

	// Remove validation errors when unmounted.
	useEffect(
		() => () => void clearValidationError( errorId ),
		[ errorId, clearValidationError ]
	);

	return (
		<div className="wc-block-components-product-add-to-cart-attribute-picker__container">
			<SelectControl
				label={ decodeEntities( attributeName ) }
				value={ value || '' }
				options={ [ selectAnOption, ...options ] }
				onChange={ onChange }
				required={ true }
				className={ classnames(
					'wc-block-components-product-add-to-cart-attribute-picker__select',
					{
						'has-error': error?.message && ! error?.hidden,
					}
				) }
			/>
			<ValidationInputError
				propertyName={ errorId }
				elementId={ errorId }
			/>
		</div>
	);
};

export default AttributeSelectControl;

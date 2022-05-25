/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';

/**
 * Renders a phone number input.
 */
const PhoneNumber = ( {
	id = 'phone',
	required = false,
	value = '',
	onChange,
}: {
	id?: string;
	required: boolean;
	value: string;
	onChange: ( value: string ) => void;
} ): JSX.Element => {
	return (
		<ValidatedTextInput
			id={ id }
			type="tel"
			autoComplete="tel"
			required={ required }
			label={
				required
					? __( 'Phone', 'woo-gutenberg-products-block' )
					: __( 'Phone (optional)', 'woo-gutenberg-products-block' )
			}
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default PhoneNumber;

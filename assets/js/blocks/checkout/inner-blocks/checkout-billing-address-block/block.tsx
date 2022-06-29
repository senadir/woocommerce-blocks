/**
 * External dependencies
 */
import { useMemo, useEffect, Fragment } from '@wordpress/element';
import {
	useCheckoutAddress,
	useStoreEvents,
	useEditorContext,
} from '@woocommerce/base-context';
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	BillingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';

const Block = ( {
	showCompanyField = false,
	showApartmentField = false,
	showPhoneField = false,
	requireCompanyField = false,
	showEmailField = false,
	requirePhoneField = false,
	requireEmailField = false,
	phoneAsPrimary = false,
}: {
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	showEmailField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	requireEmailField: boolean;
	phoneAsPrimary: boolean;
} ): JSX.Element => {
	const {
		defaultAddressFields,
		billingAddress,
		setBillingAddress,
		setShippingAddress,
		setEmail,
		setBillingPhone,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();
	const { forcedBillingAddress } = useCheckoutAddress();

	const onChangeEmail = ( value ) => {
		setEmail( value );
		dispatchCheckoutEvent( 'set-email-address' );
	};

	// Clears data if fields are hidden.
	useEffect( () => {
		if ( ! showPhoneField ) {
			setBillingPhone( '' );
		}
	}, [ showPhoneField, setBillingPhone ] );

	const addressFieldsConfig = useMemo( () => {
		return {
			company: {
				hidden: ! showCompanyField,
				required: requireCompanyField,
			},
			address_2: {
				hidden: ! showApartmentField,
			},
		};
	}, [
		showCompanyField,
		requireCompanyField,
		showApartmentField,
	] ) as Record< keyof AddressFields, Partial< AddressField > >;

	const AddressFormWrapperComponent = isEditor ? Noninteractive : Fragment;

	return (
		<AddressFormWrapperComponent>
			<AddressForm
				id="billing"
				type="billing"
				onChange={ ( values: Partial< BillingAddress > ) => {
					setBillingAddress( values );
					if ( forcedBillingAddress ) {
						setShippingAddress( values );
					}
					dispatchCheckoutEvent( 'set-billing-address' );
				} }
				values={ billingAddress }
				fields={
					Object.keys(
						defaultAddressFields
					) as ( keyof AddressFields )[]
				}
				fieldConfig={ addressFieldsConfig }
			/>
			{ phoneAsPrimary ? (
				<>
					{ showEmailField && (
						<ValidatedTextInput
							id="email"
							type="email"
							label={
								requireEmailField
									? __(
											'Email',
											'woo-gutenberg-products-block'
									  )
									: __(
											'Email (optional)',
											'woo-gutenberg-products-block'
									  )
							}
							value={ billingAddress.email }
							autoComplete="email"
							onChange={ onChangeEmail }
							required={ requireEmailField }
						/>
					) }
				</>
			) : (
				<>
					{ showPhoneField && (
						<PhoneNumber
							id="billing-phone"
							required={ requirePhoneField }
							value={ billingAddress.phone }
							onChange={ ( value ) => {
								setBillingPhone( value );
								dispatchCheckoutEvent( 'set-phone-number', {
									step: 'billing',
								} );
							} }
						/>
					) }
				</>
			) }
		</AddressFormWrapperComponent>
	);
};

export default Block;

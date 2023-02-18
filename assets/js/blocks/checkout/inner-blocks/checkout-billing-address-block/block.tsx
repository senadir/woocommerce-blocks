/**
 * External dependencies
 */
import { useMemo, useEffect, Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useCheckoutAddress,
	useStoreEvents,
	useEditorContext,
	noticeContexts,
} from '@woocommerce/base-context';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	BillingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
import {
	StoreNoticesContainer,
	ValidatedTextInput,
} from '@woocommerce/blocks-checkout';
import { isEmail } from '@wordpress/url';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';

const Block = ( {
	showCompanyField = false,
	showApartmentField = false,
	showPhoneField = false,
	requireCompanyField = false,
	requirePhoneField = false,
	phoneAsPrimary = false,
	showEmailField = true,
	requireEmailField = true,
	children,
}: {
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	phoneAsPrimary: boolean;
	showEmailField: boolean;
	requireEmailField: boolean;
	children: React.ReactNode;
} ): JSX.Element => {
	const {
		defaultAddressFields,
		billingAddress,
		setBillingAddress,
		setShippingAddress,
		setBillingPhone,
		setShippingPhone,
		useBillingAsShipping,
		setEmail,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();
	// Clears data if fields are hidden.
	useEffect( () => {
		if ( ! showPhoneField ) {
			setBillingPhone( '' );
		}
	}, [ showPhoneField, setBillingPhone ] );

	const [ addressesSynced, setAddressesSynced ] = useState( false );

	// Syncs shipping address with billing address if "Force shipping to the customer billing address" is enabled.
	useEffect( () => {
		if ( addressesSynced ) {
			return;
		}
		if ( useBillingAsShipping ) {
			setShippingAddress( billingAddress );
		}
		setAddressesSynced( true );
	}, [
		addressesSynced,
		setShippingAddress,
		billingAddress,
		useBillingAsShipping,
	] );

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
	const noticeContext = useBillingAsShipping
		? [ noticeContexts.BILLING_ADDRESS, noticeContexts.SHIPPING_ADDRESS ]
		: [ noticeContexts.BILLING_ADDRESS ];

	return (
		<AddressFormWrapperComponent>
			<StoreNoticesContainer context={ noticeContext } />
			<AddressForm
				id="billing"
				type="billing"
				onChange={ ( values: Partial< BillingAddress > ) => {
					setBillingAddress( values );
					if ( useBillingAsShipping ) {
						setShippingAddress( values );
						dispatchCheckoutEvent( 'set-shipping-address' );
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
			>
				{ phoneAsPrimary ? (
					<>
						{ showEmailField && (
							<ValidatedTextInput
								id="email"
								type="email"
								autoComplete="email"
								errorId={ 'billing_email' }
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
								required={ requireEmailField }
								onChange={ ( value ) => {
									setEmail( value );
									dispatchCheckoutEvent(
										'set-email-address'
									);
								} }
								customValidation={ (
									inputObject: HTMLInputElement
								) => {
									if ( ! isEmail( inputObject.value ) ) {
										inputObject.setCustomValidity(
											__(
												'Please enter a valid email address',
												'woo-gutenberg-products-block'
											)
										);
										return false;
									}
									return true;
								} }
							/>
						) }
					</>
				) : (
					<>
						{ showPhoneField && (
							<PhoneNumber
								id={ 'billing-phone' }
								errorId={ 'billing_phone' }
								isRequired={ requirePhoneField }
								value={ billingAddress.phone }
								onChange={ ( value ) => {
									setBillingPhone( value );
									dispatchCheckoutEvent( 'set-phone-number', {
										step: 'billing',
									} );
									if ( useBillingAsShipping ) {
										setShippingPhone( value );
										dispatchCheckoutEvent(
											'set-phone-number',
											{
												step: 'shipping',
											}
										);
									}
								} }
							/>
						) }
					</>
				) }
				{ children }
			</AddressForm>
		</AddressFormWrapperComponent>
	);
};

export default Block;

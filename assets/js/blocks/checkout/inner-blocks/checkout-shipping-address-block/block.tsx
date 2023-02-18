/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useEffect, Fragment, useState } from '@wordpress/element';
import { AddressForm } from '@woocommerce/base-components/cart-checkout';
import {
	useCheckoutAddress,
	useStoreEvents,
	useEditorContext,
	noticeContexts,
} from '@woocommerce/base-context';
import {
	CheckboxControl,
	StoreNoticesContainer,
	ValidatedTextInput,
} from '@woocommerce/blocks-checkout';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type {
	BillingAddress,
	ShippingAddress,
	AddressField,
	AddressFields,
} from '@woocommerce/settings';
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
		setShippingAddress,
		setBillingAddress,
		shippingAddress,
		billingAddress,
		setEmail,
		setBillingPhone,
		setShippingPhone,
		useShippingAsBilling,
		setUseShippingAsBilling,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const { isEditor } = useEditorContext();

	// This is used to track whether the "Use shipping as billing" checkbox was checked on first load and if we synced
	// the shipping address to the billing address if it was. This is not used on further toggles of the checkbox.
	const [ addressesSynced, setAddressesSynced ] = useState( false );

	// Clears data if fields are hidden.
	useEffect( () => {
		if ( ! showPhoneField ) {
			setShippingPhone( '' );
		}
	}, [ showPhoneField, setShippingPhone ] );

	// Run this on first render to ensure addresses sync if needed, there is no need to re-run this when toggling the
	// checkbox.
	useEffect( () => {
		if ( addressesSynced ) {
			return;
		}
		if ( useShippingAsBilling ) {
			setBillingAddress( shippingAddress );
		}
		setAddressesSynced( true );
	}, [
		addressesSynced,
		setBillingAddress,
		shippingAddress,
		useShippingAsBilling,
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
	const noticeContext = useShippingAsBilling
		? [ noticeContexts.SHIPPING_ADDRESS, noticeContexts.BILLING_ADDRESS ]
		: [ noticeContexts.SHIPPING_ADDRESS ];

	return (
		<>
			<AddressFormWrapperComponent>
				<StoreNoticesContainer context={ noticeContext } />
				<AddressForm
					id="shipping"
					type="shipping"
					onChange={ ( values: Partial< ShippingAddress > ) => {
						setShippingAddress( values );
						if ( useShippingAsBilling ) {
							setBillingAddress( values );
						}
						dispatchCheckoutEvent( 'set-shipping-address' );
					} }
					values={ shippingAddress }
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
									id={ 'shipping-phone' }
									errorId={ 'shipping_phone' }
									isRequired={ requirePhoneField }
									value={ shippingAddress.phone }
									onChange={ ( value ) => {
										setShippingPhone( value );
										dispatchCheckoutEvent(
											'set-phone-number',
											{
												step: 'billing',
											}
										);
										if ( useShippingAsBilling ) {
											setBillingPhone( value );
											dispatchCheckoutEvent(
												'set-phone-number',
												{
													step: 'billing',
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
			<CheckboxControl
				className="wc-block-checkout__use-address-for-billing"
				label={ __(
					'Use same address for billing',
					'woo-gutenberg-products-block'
				) }
				checked={ useShippingAsBilling }
				onChange={ ( checked: boolean ) => {
					setUseShippingAsBilling( checked );
					if ( checked ) {
						setBillingAddress( shippingAddress as BillingAddress );
					}
				} }
			/>
		</>
	);
};

export default Block;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCheckoutAddress, useStoreEvents } from '@woocommerce/base-context';
import { getSetting } from '@woocommerce/settings';
import {
	CheckboxControl,
	ValidatedTextInput,
} from '@woocommerce/blocks-checkout';
import { useDispatch, useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import PhoneNumber from '../../phone-number';

const Block = ( {
	allowCreateAccount,
	phoneAsPrimary,
}: {
	allowCreateAccount: boolean;
	phoneAsPrimary: boolean;
} ): JSX.Element => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	const { customerId, shouldCreateAccount } = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).getCheckoutState()
	);

	const { __internalSetShouldCreateAccount } =
		useDispatch( CHECKOUT_STORE_KEY );
	const { billingAddress, setEmail, setBillingPhone, setShippingPhone } = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();

	const onChangeEmail = ( value: string ) => {

=======
	const { customerId, shouldCreateAccount, setShouldCreateAccount } =
		useSelect( ( select ) =>
			select( CHECKOUT_STORE_KEY ).getCheckoutState()
		);
=======
	const { customerId, shouldCreateAccount } = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).getCheckoutState()
	);
>>>>>>> 978fcdb6b (Prefix all actions in the checkout and payment-method stores with `__internal` (#7266))
	const { setShouldCreateAccount } = useDispatch( CHECKOUT_STORE_KEY );
	const { billingAddress, setEmail, setBillingPhone, setShippingPhone } =
		useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();

	const onChangeEmail = ( value: string ) => {
>>>>>>> 3e5b82cad (Convert checkout context to data store - part 1 (#6232))
		setEmail( value );
		dispatchCheckoutEvent( 'set-email-address' );
	};

	const onChangePhone = ( value ) => {
		setBillingPhone( value );
		setShippingPhone( value );
		dispatchCheckoutEvent( 'set-phone' );
	};

	const createAccountUI = ! customerId &&
		allowCreateAccount &&
		getSetting( 'checkoutAllowsGuest', false ) &&
		getSetting( 'checkoutAllowsSignup', false ) && (
			<CheckboxControl
				className="wc-block-checkout__create-account"
				label={ __(
					'Create an account?',
					'woo-gutenberg-products-block'
				) }
				checked={ shouldCreateAccount }
				onChange={ ( value ) =>
					__internalSetShouldCreateAccount( value )
				}
			/>
		);

	return (
		<>
			{ phoneAsPrimary ? (
				<PhoneNumber
					id="phone"
					required={ true }
					value={ billingAddress.phone }
					onChange={ onChangePhone }
				/>
			) : (
				<ValidatedTextInput
					id="email"
					type="email"
					label={ __(
						'Email address',
						'woo-gutenberg-products-block'
					) }
					value={ billingAddress.email }
					autoComplete="email"
					onChange={ onChangeEmail }
					required={ true }
				/>
			) }

			{ createAccountUI }
		</>
	);
};

export default Block;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import {
	useCheckoutContext,
	useCheckoutAddress,
	useStoreEvents,
} from '@woocommerce/base-context';
import { getSetting } from '@woocommerce/settings';
import { CheckboxControl } from '@woocommerce/blocks-checkout';

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
	const {
		customerId,
		shouldCreateAccount,
		setShouldCreateAccount,
	} = useCheckoutContext();
	const {
		billingAddress,
		setEmail,
		setBillingPhone,
		setShippingPhone,
	} = useCheckoutAddress();
	const { dispatchCheckoutEvent } = useStoreEvents();
	const onChangeEmail = ( value ) => {
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
				onChange={ ( value ) => setShouldCreateAccount( value ) }
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

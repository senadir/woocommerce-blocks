/**
 * External dependencies
 */
<<<<<<< HEAD
import { ShippingAddress, BillingAddress } from '@woocommerce/settings';

export interface CheckoutResponseSuccess {
	billing_address: BillingAddress;
=======
import { Address } from '@woocommerce/types';

export interface CheckoutResponseSuccess {
	billing_address: Address;
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	customer_id: number;
	customer_note: string;
	extensions: Record< string, unknown >;
	order_id: number;
	order_key: string;
	payment_method: string;
	payment_result: {
		payment_details: Record< string, string > | Record< string, never >;
		payment_status: 'success' | 'failure' | 'pending' | 'error';
		redirect_url: string;
	};
<<<<<<< HEAD
	shipping_address: ShippingAddress;
=======
	shipping_address: Address;
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
	status: string;
}

export interface CheckoutResponseError {
	code: string;
	message: string;
	data: {
		status: number;
	};
}

export type CheckoutResponse = CheckoutResponseSuccess | CheckoutResponseError;

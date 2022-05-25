/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * Context consumed by inner blocks.
 */
export type CheckoutBlockContextProps = {
	allowCreateAccount: boolean;
	phoneAsPrimary: boolean;
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	showEmailField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	requireEmailField: boolean;
	showOrderNotes: boolean;
	showPolicyLinks: boolean;
	showReturnToCart: boolean;
	cartPageId: number;
	showRateAfterTaxName: boolean;
};

export type CheckoutBlockControlsContextProps = {
	addressFieldControls: () => JSX.Element | null;
	accountControls: () => JSX.Element | null;
};

export const CheckoutBlockContext: React.Context< CheckoutBlockContextProps > =
	createContext< CheckoutBlockContextProps >( {
		allowCreateAccount: false,
		phoneAsPrimary: false,
		showCompanyField: false,
		showApartmentField: false,
		showPhoneField: false,
		showEmailField: false,
		requireCompanyField: false,
		requirePhoneField: false,
		requireEmailField: false,
		showOrderNotes: true,
		showPolicyLinks: true,
		showReturnToCart: true,
		cartPageId: 0,
		showRateAfterTaxName: false,
	} );

export const CheckoutBlockControlsContext: React.Context< CheckoutBlockControlsContextProps > =
	createContext< CheckoutBlockControlsContextProps >( {
		addressFieldControls: () => null,
		accountControls: () => null,
	} );

export const useCheckoutBlockContext = (): CheckoutBlockContextProps => {
	return useContext( CheckoutBlockContext );
};

export const useCheckoutBlockControlsContext =
	(): CheckoutBlockControlsContextProps => {
		return useContext( CheckoutBlockControlsContext );
	};

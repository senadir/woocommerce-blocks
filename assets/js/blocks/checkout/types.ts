export type InnerBlockTemplate = [
	string,
	Record< string, unknown >,
	InnerBlockTemplate[] | undefined
];

export interface Attributes extends Record< string, boolean | number > {
	allowCreateAccount: boolean;
	phoneAsPrimary: boolean;
	hasDarkControls: boolean;
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	showEmailField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	requireEmailField: boolean;
	// Deprecated.
	showOrderNotes: boolean;
	showPolicyLinks: boolean;
	showReturnToCart: boolean;
	showRateAfterTaxName: boolean;
	cartPageId: number;
}

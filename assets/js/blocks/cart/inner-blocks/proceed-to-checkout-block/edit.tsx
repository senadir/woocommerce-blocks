/**
 * External dependencies
 */
import classnames from 'classnames';
import Button from '@woocommerce/base-components/button';
import { useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	PlainText,
} from '@wordpress/block-editor';
import PageSelector from '@woocommerce/editor-components/page-selector';
import { CART_PAGE_ID } from '@woocommerce/block-settings';
/**
 * Internal dependencies
 */
import './editor.scss';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		checkoutPageId: number;
		className: string;
		label: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { checkoutPageId = 0, className, label } = attributes;
	const { current: savedCheckoutPageId } = useRef( checkoutPageId );
	const currentPostId = useSelect(
		( select ) => {
			if ( ! savedCheckoutPageId ) {
				const store = select( 'core/editor' );
				return store.getCurrentPostId();
			}
			return savedCheckoutPageId;
		},
		[ savedCheckoutPageId ]
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ ! (
					currentPostId === CART_PAGE_ID && savedCheckoutPageId === 0
				) && (
					<PageSelector
						pageId={ checkoutPageId }
						setPageId={ ( id ) =>
							setAttributes( { checkoutPageId: id } )
						}
						labels={ {
							title: __(
								'Proceed to Checkout button',
								'woo-gutenberg-products-block'
							),
							default: __(
								'WooCommerce Checkout Page',
								'woo-gutenberg-products-block'
							),
						} }
					/>
				) }
			</InspectorControls>
			<Button
				className={ classnames(
					'wc-block-cart__submit-button',
					className
				) }
			>
				<PlainText
					className="wc-block-cart__plaintext"
					value={ label }
					onChange={ ( value ) =>
						setAttributes( {
							label: value,
						} )
					}
				/>
			</Button>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};

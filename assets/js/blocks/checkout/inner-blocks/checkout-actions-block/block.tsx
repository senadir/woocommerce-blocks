/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import {
	PlaceOrderButton,
	ReturnToCartButton,
} from '@woocommerce/base-components/cart-checkout';

/**
 * Internal dependencies
 */
import './style.scss';

const Block = ( {
	cartPageId,
	showReturnToCart,
	className,
}: {
	cartPageId: number;
	showReturnToCart: boolean;
	className?: string;
} ): JSX.Element => {
	return (
		<div className="wc-block-checkout__actions">
			{ showReturnToCart && (
				<ReturnToCartButton
					link={ getSetting( 'page-' + cartPageId, false ) }
				/>
			) }
			<PlaceOrderButton className={ className } />
		</div>
	);
};

export default Block;

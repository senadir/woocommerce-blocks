/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducers';
import { DispatchFromMap, SelectFromMap } from '../mapped-types';

export const config = {
	reducer,
	selectors,
	actions,
	// TODO: Gutenberg with Thunks was released in WP 6.0. Once 6.1 is released, remove the experimental flag here
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore We pass this in case there is an older version of Gutenberg running.
	__experimentalUseThunks: true,
};

const store = createReduxStore( STORE_KEY, config );
register( store );

export const CHECKOUT_STORE_KEY = STORE_KEY;
declare module '@wordpress/data' {
	function dispatch(
		key: typeof CHECKOUT_STORE_KEY
	): DispatchFromMap< typeof actions >;
<<<<<<< HEAD
	function select( key: typeof CHECKOUT_STORE_KEY ): SelectFromMap<
		typeof selectors
	> & {
=======
	function select(
		key: typeof CHECKOUT_STORE_KEY
	): SelectFromMap< typeof selectors > & {
>>>>>>> 7e0f79e5a (Move checkout state code into thunks and rename `CheckoutState` context to `CheckoutEvents` (#6455))
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}

import { createSelector, createStructuredSelector } from 'reselect';

/**
 * Selectors
 */
const selectCart = (state) => state.get('cart');

const makeSelectCartItems = () => createSelector(
  selectCart,
  (cart) => cart.get('cart')
);

const selectCartItems = makeSelectCartItems();

const makeSelectCartStatus = () => createSelector(
  selectCart,
  (cart) => cart.get('isFetching')
);

const selectCartStatus = makeSelectCartStatus();

const makeSelectCartTotalItems = () => createSelector(
  selectCart,
  () => 0
);

const selectCartTotalItems = makeSelectCartTotalItems();


export {
  selectCart,
  makeSelectCartTotalItems,
  selectCartTotalItems,
  makeSelectCartItems,
  selectCartItems,
  makeSelectCartStatus,
  selectCartStatus,
};

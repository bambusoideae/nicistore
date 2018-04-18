import { createSelector, createStructuredSelector } from 'reselect';

/**
 * Selectors
 */
const selectProduct = (state) => state.get('product');

const makeSelectProductItems = () => createSelector(
  selectProduct,
  (product) => product.get('products').toJS() // Make comparative to components - Return immutables object in next version
);

const selectProductItems = makeSelectProductItems();

const makeSelectProductStatus = () => createSelector(
  selectProduct,
  (product) => product.get('isFetching')
);

const selectProductStatus = makeSelectProductStatus();


const makeSelectProductDetails = () => createSelector(
  selectProduct,
  (product) => {
    const details = product.get('product');
    if (details) {
      return details.toJS();
    }

    return undefined;
  }
);

const selectProductDetails = makeSelectProductDetails();

export {
  selectProduct,
  makeSelectProductItems,
  selectProductItems,
  makeSelectProductStatus,
  selectProductStatus,
  makeSelectProductDetails,
  selectProductDetails,
};

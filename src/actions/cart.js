import * as ActionTypes from './cart.type';

export function fetchCart() {
  return {
    type: ActionTypes.CART_LOAD.SAGA,
  };
}

export function addProductToCart(product) {
  return {
    type: ActionTypes.CART_PRODUCT_ADD,
    payload: product,
  };
}

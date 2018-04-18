import * as ActionTypes from './products.type';


export function findProduct(filter) {
  return {
    type: ActionTypes.PRODUCTS_FIND.SAGA,
    payload: filter
  };
}

export function addProduct(product) {
  return {
    type: ActionTypes.PRODUCTS_ADD.SAGA,
    payload: product
  };
}

export function fetchProduct(productId) {
  return {
    type: ActionTypes.PRODUCTS_ITEM.SAGA,
    payload: productId
  };
}

// For admin only
export function findAllProduct(filter) {
  return {
    type: ActionTypes.PRODUCTS_ADMIN_FIND.SAGA,
    payload: filter,
  };
}

export function fetchLatestProductVersion(productId) {
  return {
    type: ActionTypes.PRODUCTS_ITEM_LATEST_FETCH_SAGA,
    payload: productId,
  };
}

export function saveProduct(productId, productInfo) {
  return {
    type: ActionTypes.PRODUCTS_ITEM_SAVE.SAGA,
    payload: { productId, productInfo }
  };
}

export function publishProduct(productId, revisionId) {
  return {
    type: ActionTypes.PRODUCTS_PUBLISH_SAGA,
    payload: { productId, revisionId }
  };
}

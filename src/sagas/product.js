import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';

// Import api
import * as productApi from '../api/product';

// Import ActionTypes
import * as ActionTypes from '../actions/products.type';

// Sign in
export function* findProduct(action) {
  // yield delay(1000);
  // yield put({ type: 'INCREMENT' });
  yield put({ type: ActionTypes.PRODUCTS_FIND.REQUEST });
  try {
    // const { filter } = action.payload;
    const products = yield call(productApi.getProducts);
    yield put({ type: ActionTypes.PRODUCTS_FIND.SUCCESS, payload: { products } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_FIND.FAILURE, error: true, payload: error });
  }
}

export function* watchFindProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_FIND.SAGA, findProduct);
}

// Add new product
export function* addProduct(action) {
  yield put({ type: ActionTypes.PRODUCTS_ADD.REQUEST });
  try {
    const product = yield call(productApi.createProduct, action.payload);
    yield put({ type: ActionTypes.PRODUCTS_ADD.SUCCESS, payload: { product } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ADD.FAILURE, error: true, payload: error });
  }
}

export function* watchAddProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_ADD.SAGA, addProduct);
}

// Get product details
export function* fetchProduct(action) {
  yield put({ type: ActionTypes.PRODUCTS_ITEM.REQUEST });
  try {
    const product = yield call(productApi.getProductById, action.payload);
    yield put({ type: ActionTypes.PRODUCTS_ITEM.SUCCESS, payload: { product } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ITEM.FAILURE, error: true, payload: error });
  }
}

export function* watchFetchProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_ITEM.SAGA, fetchProduct);
}

// Get latest product information
export function* fetchLatestProductVersion(action) {
  yield put({ type: ActionTypes.PRODUCTS_ITEM.REQUEST });
  try {
    const product = yield call(productApi.fetchLatestProductVersion, action.payload);
    yield put({ type: ActionTypes.PRODUCTS_ITEM.SUCCESS, payload: { product } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ITEM.FAILURE, error: true, payload: error });
  }
}

export function* watchFetchLatestProductVersion() {
  yield takeEvery(ActionTypes.PRODUCTS_ITEM_LATEST_FETCH_SAGA, fetchLatestProductVersion);
}

// List all products (publish & not publish)
export function* findAllProduct() {
  yield put({ type: ActionTypes.PRODUCTS_ADMIN_FIND.REQUEST });
  try {
    const products = yield call(productApi.getAllProducts);
    yield put({ type: ActionTypes.PRODUCTS_ADMIN_FIND.SUCCESS, payload: { products } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ADMIN_FIND.FAILURE, error: true, payload: error });
  }
}

export function* watchFindAllProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_ADMIN_FIND.SAGA, findAllProduct);
}

// Save product
export function* saveProduct(action) {
  yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.REQUEST });
  try {
    const product = yield call(productApi.updateProduct, action.payload.productId, action.payload.productInfo);
    yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.SUCCESS, payload: { product } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.FAILURE, error: true, payload: error });
  }
}

export function* watchSaveProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_ITEM_SAVE.SAGA, saveProduct);
}

// Publish product
export function* publishProduct(action) {
  yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.REQUEST });
  try {
    const product = yield call(productApi.publishProduct, action.payload.productId, action.payload.revisionId);
    yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.SUCCESS, payload: { product } });
  } catch (error) {
    yield put({ type: ActionTypes.PRODUCTS_ITEM_SAVE.FAILURE, error: true, payload: error });
  }
}

export function* watchPublishProduct() {
  yield takeEvery(ActionTypes.PRODUCTS_PUBLISH_SAGA, publishProduct);
}

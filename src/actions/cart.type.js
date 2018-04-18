import { getActionType, getSagaActionType, createAsyncActionTypes } from './utils';


// ActionTypes builders
export const CART_FETCH = createAsyncActionTypes('CART_FETCH');
export const CART_LOAD = createAsyncActionTypes('CART_LOAD');
export const CART_CREATE = createAsyncActionTypes('CART_CREATE');
export const CART_CLAIM = createAsyncActionTypes('CART_CLAIM');
export const CART_MERGE = createAsyncActionTypes('CART_MERGE');
export const CART_ARCHIVE = createAsyncActionTypes('CART_ARCHIVE');
export const CART_UPDATE = createAsyncActionTypes('CART_UPDATE');
export const CART_PRODUCT_ADD = getActionType('CART_PRODUCT_ADD');

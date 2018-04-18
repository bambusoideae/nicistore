import { getActionType, getSagaActionType, createAsyncActionTypes } from './utils';


// ActionTypes builders
// Standards redux ActionTypes
// export const ACCOUNT_AUTH_STATE_CHANGED = getActionType('ACCOUNT_AUTH_STATE_CHANGED');
// export const ACCOUNT_AUTH_INITIALIZED = getActionType('ACCOUNT_AUTH_INITIALIZED');
export const PRODUCTS_ITEM_LATEST_FETCH_SAGA = getSagaActionType('PRODUCTS_ITEM_LATEST_FETCH_SAGA');
export const PRODUCTS_PUBLISH_SAGA = getSagaActionType('PRODUCTS_PUBLISH_SAGA');

// Async ActionTypes
export const PRODUCTS_ADD = createAsyncActionTypes('PRODUCTS_ADD');
export const PRODUCTS_FIND = createAsyncActionTypes('PRODUCTS_FIND');
export const PRODUCTS_ADMIN_FIND = createAsyncActionTypes('PRODUCTS_ADMIN_FIND');
export const PRODUCTS_HOMEPAGE = createAsyncActionTypes('PRODUCTS_HOMEPAGE');
export const PRODUCTS_ITEM = createAsyncActionTypes('PRODUCTS_ITEM');
export const PRODUCTS_ITEM_SAVE = createAsyncActionTypes('PRODUCTS_ITEM_SAVE');
export const PRODUCTS_UPLOAD = createAsyncActionTypes('PRODUCTS_UPLOAD');


// Suggestions for a given product
export const PRODUCTS_SUGGESTIONS = 'PRODUCTS_SUGGESTIONS';
export const PRODUCTS_SUGGESTIONS_SUCCESS = 'PRODUCTS_SUGGESTIONS_SUCCESS';
export const PRODUCTS_SUGGESTIONS_ERROR = 'PRODUCTS_SUGGESTIONS_ERROR';
export const PRODUCTS_SUGGESTIONS_CLEAR = 'PRODUCTS_SUGGESTIONS_CLEAR';

// Product-targeted contents
export const PRODUCTS_CONTENTS = 'PRODUCTS_CONTENTS';
export const PRODUCTS_CONTENTS_SUCCESS = 'PRODUCTS_CONTENTS_SUCCESS';
export const PRODUCTS_CONTENTS_ERROR = 'PRODUCTS_CONTENTS_ERROR';

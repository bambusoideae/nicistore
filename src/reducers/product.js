/*
 * Product Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { createReducer, mergeHandlers, createAsyncHandler } from './utils';
import * as ActionTypes from '../actions/products.type';


// The initial state of the Account
const initialState = {
  isFetching: false,
  didInvalidate: undefined,
  lastUpdated: undefined,
  products: [],
  product: undefined,
};

const handlers = mergeHandlers(
  createAsyncHandler(ActionTypes.PRODUCTS_ADD),
  createAsyncHandler(ActionTypes.PRODUCTS_FIND),
  createAsyncHandler(ActionTypes.PRODUCTS_ADMIN_FIND),
  createAsyncHandler(ActionTypes.PRODUCTS_ITEM),
  createAsyncHandler(ActionTypes.PRODUCTS_ITEM_SAVE),
);

export default createReducer(initialState, handlers);

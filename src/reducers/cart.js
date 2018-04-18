/*
 * Cart Reducer
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
import * as ActionTypes from '../actions/cart.type';


// The initial state of the Account
const initialState = {
  isFetching: false,
  didInvalidate: undefined,
  lastUpdated: undefined,
  cart: undefined,
};

const handlers = mergeHandlers(
  createAsyncHandler(ActionTypes.CART_FETCH),
  createAsyncHandler(ActionTypes.CART_LOAD),
);

export default createReducer(initialState, handlers);

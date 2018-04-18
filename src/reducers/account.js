/*
 * AccountReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';


import { createReducer } from './utils';
import * as ActionTypes from '../actions/account.type';


// The initial state of the Account
const initialState = fromJS({
  error: undefined,
  information: undefined,
  isAuthenticated: false,
  user: undefined,
});

const handlers = {
  [ActionTypes.ACCOUNT_AUTH_STATE_CHANGED]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;

      if (action.payload.user) {
        return initialState.merge({
          isAuthenticated: true,
        }, action.payload);
      }

      return initialState;
    }

    return {
      error: action.payload,
      information: undefined,
      isAuthenticated: false,
      user: undefined,
    };
  },
  [ActionTypes.ACCOUNT_LOGOUT.SUCCESS]: () => initialState,
};

export default createReducer(initialState, handlers);

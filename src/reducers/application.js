/*
 * ResponsiveReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { createReducer } from './utils';
import * as ActionTypes from '../actions/application.type';


// The initial state of the Account
const initialState = {
  openedDrawer: undefined,
};

const handlers = {
  [ActionTypes.APPLICATION_DRAWER_TRIGGER]: (state, action) => {
    if (action.payload === this.openedDrawer) {
      return { openedDrawer: null };
    }

    return { openedDrawer: action.payload };
  },
};

export default createReducer(initialState, handlers);

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
import { fromJS } from 'immutable';


import { createReducer } from './utils';
import {
  APPLICATION_MOBILE_BREAKPOINT_SET,
  APPLICATION_PAGE_WIDTH_CHANGED
} from '../actions/application.type';

/**
 * Constants
 */
const BREAK_SMALL = 768;
const BREAK_LARGE = 1024;

// The initial state of the Account
const initialState = fromJS({
  // breakpoint: 'handhelds' // Default is "mobile-first"
  breakpoint: 'wide-screens' // Default is "mobile-first"
});

const handlers = {
  [APPLICATION_MOBILE_BREAKPOINT_SET]: (state, action) => {
    if (action.payload === true) {
      return { breakpoint: 'handhelds' };
    }

    return { breakpoint: 'wide-screens' };
  },
  [APPLICATION_PAGE_WIDTH_CHANGED]: (state, action) => {
    const width = action.payload;

    if (width <= BREAK_SMALL) {
      return { breakpoint: 'handhelds' };
    } else if (width > BREAK_SMALL && width < BREAK_LARGE) {
      return { breakpoint: 'medium-screens' };
    }

    return { breakpoint: 'wide-screens' };
  }
};

export default createReducer(initialState, handlers);

import { fromJS } from 'immutable';

// createReducer allways using shallow merge with prevState
export function createReducer(initialState, handlers) {
  const initialStateImmutable = fromJS(initialState); // Ensure initial state is immutable object
  return (state = initialStateImmutable, action) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    // return { ...state, ...handler(state, action) }; // Javascripts Objects only
    return state.merge(handler(state, action)); // For immutable-js
  };
}

// Create Async handlers for multiple action types pattern
export function createAsyncHandlerMultipleTypes(actionTypes) {
  const { REQUEST, SUCCESS, FAILURE } = actionTypes;
  /* eslint-disable arrow-body-style */
  return {
    [REQUEST]: () => {
      return { isFetching: true };
    },
    [SUCCESS]: (state, action) => {
      action.payload.error = undefined;

      return {
        isFetching: false,
        ...action.payload
      };
    },
    [FAILURE]: (state, action) => {
      return {
        isFetching: false,
        error: action.payload
      };
    },
  };
  /* eslint-enable */
}

// Create Async handler for single action types pattern
export function createAsyncHandlerSingleType(actionType) {
  // { type: 'FETCH_POSTS' }
  // { type: 'FETCH_POSTS', error: true, payload: new Error('Oops') }
  // { type: 'FETCH_POSTS', payload: { ... } }
  return {
    [actionType]: (state, action) => {
      const { error, payload } = action;
      if (!payload) {
        // Loading state
        // isFetching = true
        return { isFetching: true };
      } else if (!error) {
        // Success
        action.payload.error = undefined;

        return {
          isFetching: false,
          ...action.payload
        };
      }

      // on error
      return {
        isFetching: false,
        error: action.payload
      };
    }
  };
}

// Create async handlers
// Support both Single action type with flags and multiple action types pattern
export function createAsyncHandler(actionTypes) {
  if (typeof actionTypes === 'string') {
    // single action type with flags.
    return createAsyncHandlerSingleType(actionTypes);
  }

  // multiple action types
  return createAsyncHandlerMultipleTypes(actionTypes);
}

// Merge handlers
export function mergeHandlers(...handlers) {
  return Object.assign(...handlers);
}

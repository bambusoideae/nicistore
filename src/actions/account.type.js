import { getActionType, getSagaActionType, createAsyncActionTypes } from './utils';


// ActionTypes builders
// Standards redux ActionTypes
export const ACCOUNT_AUTH_STATE_CHANGED = getActionType('ACCOUNT_AUTH_STATE_CHANGED');
export const ACCOUNT_AUTH_INITIALIZED = getActionType('ACCOUNT_AUTH_INITIALIZED');

// Async ActionTypes
export const ACCOUNT_FETCH = createAsyncActionTypes('ACCOUNT_FETCH');
export const ACCOUNT_LOGIN = createAsyncActionTypes('ACCOUNT_LOGIN');
export const ACCOUNT_LOGOUT = createAsyncActionTypes('ACCOUNT_LOGOUT');
export const ACCOUNT_REGISTER = createAsyncActionTypes('ACCOUNT_REGISTER');
export const ACCOUNT_RESET = createAsyncActionTypes('ACCOUNT_RESET');
export const ACCOUNT_UPDATE = createAsyncActionTypes('ACCOUNT_UPDATE');

import * as ActionTypes from './account.type';


export default function updateAuthState(user, error) {
  if (!error) {
    return {
      type: ActionTypes.ACCOUNT_AUTH_STATE_CHANGED,
      payload: { user },
    };
  }

  return {
    type: ActionTypes.ACCOUNT_AUTH_STATE_CHANGED,
    payload: error,
    error: true,
  };
}


export function signIn(email, password) {
  return {
    type: ActionTypes.ACCOUNT_LOGIN.SAGA,
    payload: { email, password }
  };
}

export function signOut() {
  return {
    type: ActionTypes.ACCOUNT_LOGOUT.SAGA,
  };
}

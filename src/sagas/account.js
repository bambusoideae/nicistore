import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';

// Import api
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '../api/authentication';
import * as authApi from '../api/authentication';

// Import ActionTypes
import * as ActionTypes from '../actions/account.type';

// Sign in
export function* signIn(action) {
  // yield delay(1000);
  // yield put({ type: 'INCREMENT' });
  yield put({ type: ActionTypes.ACCOUNT_LOGIN.REQUEST });
  try {
    const { email, password } = action.payload;
    yield call(authApi.signInWithEmailAndPassword, email, password);
    yield put({ type: ActionTypes.ACCOUNT_LOGIN.SUCCESS });
  } catch (error) {
    yield put({ type: ActionTypes.ACCOUNT_LOGIN.FAILURE, error: true, payload: error });
  }
}

export function* watchSignIn() {
  yield takeEvery(ActionTypes.ACCOUNT_LOGIN.SAGA, signIn);
}


// Sign up
export function* signUp(action) {
  yield put({ type: ActionTypes.ACCOUNT_REGISTER.REQUEST });
  try {
    const { username, password } = action.payload;
    yield call(authApi.createUserWithEmailAndPassword, username, password);
  } catch (error) {
    yield put({ type: ActionTypes.ACCOUNT_REGISTER.FAILURE, error: true, payload: error });
  }
}

export function* watchSignUp() {
  yield takeEvery(ActionTypes.ACCOUNT_REGISTER.SAGA, signUp);
}

// Sign out
export function* signOut() {
  yield put({ type: ActionTypes.ACCOUNT_LOGOUT.REQUEST });
  try {
    yield call(authApi.signOut);
    yield put({ type: ActionTypes.ACCOUNT_LOGOUT.SUCCESS });
  } catch (error) {
    yield put({ type: ActionTypes.ACCOUNT_LOGOUT.FAILURE, error: true, payload: error });
  }
}

export function* watchSignOut() {
  yield takeEvery(ActionTypes.ACCOUNT_LOGOUT.SAGA, signOut);
}

import { put, takeEvery, all } from 'redux-saga/effects';

// Import saga action
import { watchSignIn, watchSignUp, watchSignOut } from './account';
import {
  watchFindProduct,
  watchAddProduct,
  watchFindAllProduct,
  watchFetchProduct,
  watchFetchLatestProductVersion,
  watchSaveProduct,
  watchPublishProduct,
} from './product';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
    watchAddProduct(),
    watchFindProduct(),
    watchFindAllProduct(),
    watchFetchProduct(),
    watchFetchLatestProductVersion(),
    watchSaveProduct(),
    watchPublishProduct(),
  ]);
}

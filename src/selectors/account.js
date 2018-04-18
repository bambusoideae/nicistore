import { createSelector, createStructuredSelector } from 'reselect';

/**
 * Selectors
 */
const selectAccount = (state) => state.get('account');

const makeSelectAccountInformation = () => createSelector(
  selectAccount,
  (account) => account.get('information')
);

const selectAccountInformation = makeSelectAccountInformation();

const makeSelectAuthenticateState = () => createSelector(
  selectAccount,
  (account) => account.get('isAuthenticated')
);

const selectAuthenticateState = makeSelectAuthenticateState();

export {
  selectAccount,
  makeSelectAccountInformation,
  selectAccountInformation,
  makeSelectAuthenticateState,
  selectAuthenticateState,
};

/*
 * Login Messages
 *
 * This contains all the text for the Login component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  disabled: {
    id: 'app.containers.screens.Login.disabled',
    defaultMessage: 'Your account is disabled',
  },
  email: {
    id: 'app.containers.screens.Login.email',
    defaultMessage: 'Email',
  },
  fieldRequired: {
    id: 'app.containers.screens.Login.fieldRequired',
    defaultMessage: 'This field is required',
  },
  invalidCredentials: {
    id: 'app.containers.screens.Login.invalidCredentials',
    defaultMessage: 'Invalid credentials',
  },
  login: {
    id: 'app.containers.screens.Login.login',
    defaultMessage: 'Login',
  },
  mergeCartsConfirm: {
    id: 'app.containers.screens.Login.mergeCartsConfirm',
    defaultMessage: 'Your account has a cart with some products on it. Do you want to merge your current cart with it? (If you say "no", your current cart will be discarded)',
  },
  mergeCartsTitle: {
    id: 'app.containers.screens.Login.mergeCartsTitle',
    defaultMessage: 'Merge Carts',
  },
  password: {
    id: 'app.containers.screens.Login.password',
    defaultMessage: 'Password',
  },
  pendingConfirmation: {
    id: 'app.containers.screens.Login.pendingConfirmation',
    defaultMessage: 'Your account is pending email confirmation',
  },
  submit: {
    id: 'app.containers.screens.Login.submit',
    defaultMessage: 'Sign in',
  },
  unknownStatus: {
    id: 'app.containers.screens.Login.unknownStatus',
    defaultMessage: 'Error. Please contact support',
  },
  yes: {
    id: 'app.containers.screens.Login.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'app.containers.screens.Login.no',
    defaultMessage: 'No',
  },
  forgotPassword: {
    id: 'app.containers.screens.Login.forgotPassword',
    defaultMessage: 'Forgot password?'
  },
});

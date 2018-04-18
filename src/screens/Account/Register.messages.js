/*
 * Register Messages
 *
 * This contains all the text for the Register component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  email: {
    id: 'app.containers.screens.Register.email',
    defaultMessage: 'Email',
  },
  fieldRequired: {
    id: 'app.containers.screens.Register.fieldRequired',
    defaultMessage: 'This field is required',
  },
  login: {
    id: 'app.containers.screens.Register.login',
    defaultMessage: 'Login',
  },
  name: {
    id: 'app.containers.screens.Register.name',
    defaultMessage: 'Full Name',
  },
  password: {
    id: 'app.containers.screens.Register.password',
    defaultMessage: 'Password',
  },
  passwordConfirm: {
    id: 'app.containers.screens.Register.passwordConfirm',
    defaultMessage: 'Confirm Password',
  },
  passwordMismatch: {
    id: 'app.containers.screens.Register.passwordMismatch',
    defaultMessage: 'Passwords don\'t match',
  },
  submit: {
    id: 'app.containers.screens.Register.submit',
    defaultMessage: 'Register',
  },
  successModalContinue: {
    id: 'app.containers.screens.Register.successModalContinue',
    defaultMessage: 'OK',
  },
  successModalTitle: {
    id: 'app.containers.screens.Register.successModalTitle',
    defaultMessage: 'Account Created',
  },
  successModalBody: {
    id: 'app.containers.screens.Register.successModalBody',
    defaultMessage: 'Your account will be activated after you follow the confirmation link in the email that will be sent shortly.',
  },
  title: {
    id: 'app.containers.screens.Register.title',
    defaultMessage: 'Register Account',
  },
});

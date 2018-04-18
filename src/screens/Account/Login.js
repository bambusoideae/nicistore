/**
 * Imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Link, Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';

import { createStructuredSelector } from 'reselect';

// Selectors
// import { selectOpenedDrawer } from '../selectors/drawer';
import { selectAuthenticateState } from '../../selectors/account';

// Actions
// import { triggerDrawer } from '../actions/drawer';
import { signIn } from '../../actions/account';

// Required components
import Button from '../../components/common/buttons/Button';
import Heading from '../../components/common/typography/Heading';
import InputField from '../../components/common/forms/InputField';
import Modal from '../../components/common/modals/Modal';
import Text from '../../components/common/typography/Text';

// Translation data for this component
import messages from './Login.messages';

/**
 * Component.
 */
class Login extends React.Component {
  // Page Title and Snippets
  static pageTitleAndSnippets = () => {
    return {
      title: <FormattedMessage {...messages.login} />
    };
  };

  // Initial State
  state = {
    // loading: this.context.getStore(LoginStore).isLoading(),
    // loadingAccountDetails: this.context.getStore(AccountStore).isLoading(),
    // loadingCart: this.context.getStore(CartStore).isLoading(),
    // error: this.context.getStore(LoginStore).getError(),

    email: undefined,
    password: undefined,
    fieldErrors: {},
    errorMessage: undefined,
    showMergeCartsModal: false,
    loggingIn: false
  };

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Login.scss');
  }

  // componentWillReceiveProps(nextProps) {

  //   // Find field error descriptions in request response
  //   let fieldErrors = {};
  //   if (this.state.loading && !nextProps._loading && nextProps._error) {
  //     if (nextProps._error.validation && nextProps._error.validation.keys) {
  //       nextProps._error.validation.keys.forEach((field) => {
  //         fieldErrors[field] = nextProps._error.validation.details[field];
  //       });
  //     } else if (!nextProps._error.hasOwnProperty('status')) {
  //       fieldErrors.email = <FormattedMessage {...messages.invalidCredentials} />;
  //       fieldErrors.password = <FormattedMessage {...messages.invalidCredentials} />;
  //     } else if (['pendingConfirmation', 'disabled'].indexOf(nextProps._error.status) !== -1) {
  //       this.setState({
  //         errorMessage: nextProps._error.status
  //       });
  //     } else {
  //       this.setState({
  //         errorMessage: <FormattedMessage {...messages.unknownStatus} />
  //       });
  //     }
  //   }

  //   // Check for:
  //   // - Account Details (i.e. we are successfully logged in)
  //   // - Successful cart claim
  //   // Now we need to process the cart state
  //   if (this.state.loggingIn && this.context.getStore(AccountStore).getAccountDetails() && this.state.loadingCart && !nextProps._loadingCart) {

  //     this.setState({loggingIn: false});

  //     //
  //     // The rule of thumb is that we should always use the most recent, not archived, cart of the user and always
  //     // archive any anonymously claimed carts. The exception is when they (the anonymously claimed) have products
  //     // and we should ask whether we should merge them. Remember that, if the user chooses NOT to merge them,
  //     // the products that prevail are the ones of the anonymous cart (since it's the most "recent" cart).
  //     //

  //     let userCarts = this.context.getStore(AccountStore).getAccountDetails().carts;

  //     // a) User has no previous carts, maintain the currently claimed Cart (on the login action)
  //     // b) The most recent cart is the active one (on store/localstorage)
  //     if ((!userCarts || userCarts.length === 0) || userCarts[0].id === this.context.getStore(CartStore).getCartId()) {
  //       this.next();
  //     }

  //     // c) Claimed cart has products
  //     else if (this.context.getStore(CartStore).getProducts().length > 0) {
  //       this.setState({ showMergeCartsModal: true });
  //     }

  //     // d) Set the user's most recent cart as the active one and archive claimed cart
  //     // --> Same as not merging current cart with the one the user had saved
  //     else {
  //       this.handleMergeCartsModalNoClick();
  //     }
  //   }

  //   this.setState({
  //     loading: nextProps._loading,
  //     loadingAccountDetails: nextProps._loadingAccountDetails,
  //     loadingCart: nextProps._loadingCart,
  //     error: nextProps._error,
  //     fieldErrors: fieldErrors
  //   });
  // }

  // Helper Methods
  isLoading = () => {
    return this.state.loading || this.state.loadingAccountDetails || this.state.loadingCart;
  };

  next = () => {
    // if (this.props.query.next) {
    //   this.context.router.transitionTo(this.props.query.next);
    // } else {
    //   this.context.router.transitionTo('homepage', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
    // }
  };

  // View Controllers
  handleFieldChange = (param, value) => {
    this.setState({ [param]: value });
  };

  handleSubmitClick = () => {
    const fieldErrors = {};
    if (!this.state.email) {
      fieldErrors.email = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.password) {
      fieldErrors.password = <FormattedMessage {...messages.fieldRequired} />;
    }
    this.setState({ fieldErrors });
    this.setState({ errorMessage: null });

    if (Object.keys(fieldErrors).length === 0) {
      this.setState({ loggingIn: true });
      const { email, password } = this.state;
      this.props.signIn(email, password);
    }
  };

  handleMergeCartsModalNoClick = () => {
    // let userCarts = this.context.getStore(AccountStore).getAccountDetails().carts;
    // this.context.executeAction(archiveCart, this.context.getStore(CartStore).getCartId());
    // this.context.executeAction(loadUserCart, userCarts[0].id);
    // this.next();
  };

  handleMergeCartsModalYesClick = () => {
    // let userCarts = this.context.getStore(AccountStore).getAccountDetails().carts;
    // this.context.executeAction(mergeCart, {
    //   cartId: userCarts[0].id,
    //   mergeId: this.context.getStore(CartStore).getCartId()
    // });
    // this.next();
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params

    // If user is authenticated, redirect to homepage
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // Return the "merge carts" modal
    const mergeCartsModal = () => {
      if (this.state.showMergeCartsModal === true) {
        return (
          <Modal title={<FormattedMessage {...messages.mergeCartsTitle} />}>
            <div className="login__modal-form-item">
              <FormattedMessage {...messages.mergeCartsConfirm} />
            </div>
            <div className="login__modal-form-actions">
              <div className="login__modal-form-action-item">
                <Button type="default"
                  onClick={this.handleMergeCartsModalNoClick}
                  disabled={this.isLoading()}>
                  <FormattedMessage {...messages.no} />
                </Button>
              </div>
              <div className="login__modal-form-action-item">
                <Button type="primary"
                  onClick={this.handleMergeCartsModalYesClick}
                  disabled={this.isLoading()}>
                  <FormattedMessage {...messages.yes} />
                </Button>
              </div>
            </div>
          </Modal>
        );
      }
    };

    //
    // Return
    //
    return (
      <div className="login">
        {mergeCartsModal()}
        <div className="login__container">
          <div className="login__header">
            <Heading>
              <FormattedMessage {...messages.login} />
            </Heading>
          </div>
          {this.state.errorMessage ?
            <div className="login__error-message">
              <Text size="small">{this.state.errorMessage}</Text>
            </div>
            :
            null
          }
          <div className="login__form">
            <div className="login__form-item">
              <InputField label={<FormattedMessage {...messages.email} />}
                onChange={(value) => this.handleFieldChange('email', value)}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.email}
                value={this.state.email} />
            </div>
            <div className="login__form-item">
              <InputField type="password"
                label={<FormattedMessage {...messages.password} />}
                onChange={(value) => this.handleFieldChange('password', value)}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.password}
                value={this.state.password} />
            </div>
            <div className="login__form-actions">
              <Button type="primary" onClick={this.handleSubmitClick} disabled={this.isLoading()}>
                <FormattedMessage {...messages.submit} />
              </Button>
            </div>
            <div className="login__form-reset">
              <Link className="login__link" to="reset" params={routeParams}>
                <Text><FormattedMessage {...messages.forgotPassword} /></Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Flux
 */
// Login = connectToStores(Login, [AccountStore, CartStore, LoginStore], (context) => {
//   return {
//     _error: context.getStore(LoginStore).getError(),
//     _loading: context.getStore(LoginStore).isLoading(),
//     _loadingAccountDetails: context.getStore(AccountStore).isLoading(),
//     _loadingCart: context.getStore(CartStore).isLoading()
//   };
// });

Login.defaultProps = {
  signIn: () => {},
  isAuthenticated: undefined,
};

Login.propTypes = {
  signIn: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectAuthenticateState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password) => {
      dispatch(signIn(email, password));
    },
    redirect: (route) => {
      dispatch(push(route));
    }
  };
};

// Need update when route is change so don't miss withRouter
const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

/**
 * Export
 */
export default LoginWrapper;

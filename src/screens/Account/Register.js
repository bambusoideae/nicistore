/**
 * Imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';


// Required components
import Button from '../../components/common/buttons/Button';
import Heading from '../../components/common/typography/Heading';
import InputField from '../../components/common/forms/InputField';
import Modal from '../../components/common/modals/Modal';
import Text from '../../components/common/typography/Text';

// Translation data for this component
import messages from './Register.messages';

/**
 * Component.
 */
class Register extends React.Component {
  // Page Title and Snippets
  static pageTitleAndSnippets = (context) => {
    return {
      title: <FormattedMessage {...messages.title} />
    };
  };

  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      passwordConfirm: undefined,
      // loading: this.context.getStore(RegisterStore).isLoading(),
      // error: this.context.getStore(RegisterStore).getError(),
      fieldErrors: {},
      showSuccessModal: false
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Register.scss');
  }

  componentWillReceiveProps(nextProps) {
    // Find field error descriptions in request response
    // let fieldErrors = {};
    // if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
    //   nextProps._error.validation.keys.forEach(function (field) {
    //     fieldErrors[field] = nextProps._error.validation.details[field];
    //   });
    // }

    // // Check for a successful register
    // if (this.state.loading && !nextProps._loading && !nextProps._error) {
    //   this.setState({showSuccessModal: true});
    // }

    // this.setState({
    //   loading: nextProps._loading,
    //   error: nextProps._error,
    //   fieldErrors: fieldErrors
    // })
  }

  // View Controllers
  handleFieldChange = (param, value) => {
    this.setState({ [param]: value });
  };

  handleSubmitClick = () => {
    this.setState({ fieldErrors: {} });
    let fieldErrors = {};
    if (!this.state.name) {
      fieldErrors.name = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.email) {
      fieldErrors.email = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.password) {
      fieldErrors.password = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.passwordConfirm) {
      fieldErrors.passwordConfirm = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (this.state.password && this.state.passwordConfirm && this.state.password !== this.state.passwordConfirm) {
      fieldErrors.passwordConfirm = <FormattedMessage {...messages.passwordMismatch} />;
    }
    this.setState({ fieldErrors });

    if (Object.keys(fieldErrors).length === 0) {
      // Register new account
      // this.context.executeAction(registerAccount, {
      //   name: this.state.name,
      //   email: this.state.email,
      //   password: this.state.password
      // });
    }
  };

  handleModalContinueClick = () => {
    // Goto homepage
    // this.context.router.transitionTo('homepage', {locale: this.context.getStore(IntlStore).getCurrentLocale()});
  };

  // Template
  render() {
    const successModal = () => {
      if (this.state.showSuccessModal) {
        return (
          <Modal title={<FormattedMessage {...messages.successModalTitle} />}>
            <div className="register__modal-body">
              <Text size="medium">
                <FormattedMessage {...messages.successModalBody} />
              </Text>
            </div>
            <div className="register__modal-footer">
              <Button type="primary" onClick={this.handleModalContinueClick}>
                <FormattedMessage {...messages.successModalContinue} />
              </Button>
            </div>
          </Modal>
        );
      }
    };

    return (
      <div className="register">
        {successModal()}

        <div className="register__container">
          <div className="register__header">
            <Heading>
              <FormattedMessage {...messages.title} />
            </Heading>
          </div>
          <div className="register__form">
            <div className="register__form-item">
              <InputField label={<FormattedMessage {...messages.name} />}
                onChange={() => this.handleFieldChange('name')}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.name} />
            </div>
            <div className="register__form-item">
              <InputField label={<FormattedMessage {...messages.email} />}
                onChange={() => this.handleFieldChange('email')}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.email} />
            </div>
            <div className="register__form-item">
              <InputField type="password"
                label={<FormattedMessage {...messages.password} />}
                onChange={() => this.handleFieldChange('password')}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.password} />
            </div>
            <div className="register__form-item">
              <InputField type="password"
                label={<FormattedMessage {...messages.passwordConfirm} />}
                onChange={() => this.handleFieldChange('passwordConfirm')}
                onEnterPress={this.handleSubmitClick}
                error={this.state.fieldErrors.passwordConfirm} />
            </div>
            <div className="register__form-actions">
              <Button type="primary" onClick={this.handleSubmitClick} disabled={this.state.loading}>
                <FormattedMessage {...messages.submit} />
              </Button>
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
// Register = connectToStores(Register, [RegisterStore], (context) => {
//   return {
//     _error: context.getStore(RegisterStore).getError(),
//     _loading: context.getStore(RegisterStore).isLoading()
//   };
// });

/**
 * Export
 */
export default Register;

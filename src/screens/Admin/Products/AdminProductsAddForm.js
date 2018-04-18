/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';


// Required components
import Button from '../../../components/common/buttons/Button';
import InputField from '../../../components/common/forms/InputField';
// import Select from '../../../components/common/forms/Select';

// Translation data for this component
import messages from './AdminProductsAddForm.messages';
import * as commonMessages from '../../../containers/LanguageProvider/messages/common';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminProductsAddForm extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      name: undefined,
      sku: undefined,
      fieldErrors: {}
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AdminProductsAddForm.scss');
  }

  // View Controllers
  handleSKUChange = (value) => {
    this.setState({ sku: value });
  };

  handleNameChange = (value) => {
    this.setState({ name: value });
  };

  handleSubmitClick = () => {
    const fieldErrors = {};
    if (!this.state.sku) {
      fieldErrors.sku = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.name) {
      fieldErrors.name = <FormattedMessage {...messages.fieldRequired} />;
    }
    this.setState({ fieldErrors });

    if (Object.keys(fieldErrors).length === 0) {
      this.props.onSubmitClick({
        sku: this.state.sku,
        name: this.state.name
      });
    }
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const fieldError = (field) => {
      return this.props.error ? this.props.error[field] : this.state.fieldErrors[field];
    };

    //
    // Return
    //
    return (
      <div className="admin-products-add-form">
        <div className="admin-products-add-form__item">
          <InputField label={<FormattedMessage {...messages.sku} />}
            onChange={this.handleSKUChange}
            error={fieldError('sku')} />
        </div>
        <div className="admin-products-add-form__item">
          <InputField label={<div><FormattedMessage {...messages.name} /> (EN)</div>}
            onChange={this.handleNameChange}
            error={fieldError('name')} />
        </div>
        {/* <div className="admin-products-add-form__item">
          <InputField label={<div><FormattedMessage {...messages.name} /> (PT)</div>}
            onChange={() => this.handleNameChange('pt')}
            error={fieldError('namePT')} />
        </div> */}
        <div className="admin-products-add-form__actions">
          <div className="admin-products-add-form__button">
            <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
              <FormattedMessage {...commonMessages.form.cancel} />
            </Button>
          </div>
          <div className="admin-products-add-form__button">
            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
              <FormattedMessage {...commonMessages.form.add} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AdminProductsAddForm.defaultProps = {
  onCancelClick: () => debug('onCancelClick not defined'),
  onSubmitClick: (data) => debug(`onSubmitClick not defined. Value: ${data}`),
  loading: undefined,
  error: undefined,
};

AdminProductsAddForm.propTypes = {
  onCancelClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  loading: PropTypes.any,
  error: PropTypes.any,
};

/**
 * Exports
 */
export default AdminProductsAddForm;

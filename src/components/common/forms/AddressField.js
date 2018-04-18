/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


import { FormattedMessage } from 'react-intl';


// Required components
import Button from '../buttons/Button';

import InlineItems from './InlineItems';
import InputField from './InputField';
import Select from './Select';

// Translation data for this component
import messages from './AddressField.messages';

/**
 * Component
 */
class AddressField extends React.Component {
  constructor(props) {
    super(props);
    
    // Initial State
    this.state = {
      address: props.address || {},
      fieldErrors: {}
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AddressField.scss');
  }

  // View Controllers
  handleSavedAddressChange = (idx) => {
    this.props.onSubmit(this.props.savedAddresses[idx]);
  };

  handleFieldChange = (field, value) => {
    let address = this.state.address;
    address[field] = value;
    this.setState({ address: address });
  };

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleSubmitClick = () => {
    // Client-side validations
    let fieldErrors = {};

    // if (!this.state.address.name) {
    //   fieldErrors.name = intlStore.getMessage(intlData, 'fieldRequired');
    // }

    // if (!this.state.address.addressLine1) {
    //   fieldErrors.addressLine1 = intlStore.getMessage(intlData, 'fieldRequired');
    // }

    // if (!this.state.address.postalCode) {
    //   fieldErrors.postalCode = intlStore.getMessage(intlData, 'fieldRequired');
    // }

    // if (!this.state.address.city) {
    //   fieldErrors.city = intlStore.getMessage(intlData, 'fieldRequired');
    // }

    // if (!this.state.address.country) {
    //   fieldErrors.country = intlStore.getMessage(intlData, 'fieldRequired');
    // }

    this.setState({
      fieldErrors: fieldErrors
    });

    // Validation passed, trigger request
    if (Object.keys(fieldErrors).length === 0) {
      this.props.onSubmit(this.state.address);
    }
  };

  // Template
  render() {
    let countryOptions = [
      { name: 'Portugal', value: 'PT' }
    ];

    let addressOptions;
    if (this.props.savedAddresses && this.props.savedAddresses.length > 0) {
      addressOptions = this.props.savedAddresses.map((address, idx) => {
        return {
          value: idx,
          name: `${address.name}, ${address.addressLine1} ${address.addressLine2}, ${address.postalCode} ${address.city}`
        };
      });
    }

    return (
      <div className="address-field">
        {addressOptions ?
          <div className="address-field__item address-field__saved-addresses">
            <Select label={<FormattedMessage {...messages.savedAddresses} />}
              labelWeight="normal"
              labelSize="small"
              placeholder
              options={addressOptions}
              onChange={this.handleSavedAddressChange} />
          </div>
          :
          null
        }
        <div className="address-field__item">
          <InlineItems>
            <InputField
              label={<FormattedMessage {...messages.name} />}
              labelWeight={this.props.labelWeight}
              value={this.state.address.name}
              onChange={() => this.handleFieldChange('name')}
              error={this.state.fieldErrors.name} />
            <InputField
              label={<FormattedMessage {...messages.phoneNumber} />}
              labelWeight={this.props.labelWeight}
              value={this.state.address.phone}
              onChange={() => this.handleFieldChange('phone')}
              error={this.state.fieldErrors.phone} />
          </InlineItems>
        </div>
        <div className="address-field__item">
          <InputField
            label={<FormattedMessage {...messages.vatin} />}
            labelWeight={this.props.labelWeight}
            value={this.state.address.vatin}
            onChange={() => this.handleFieldChange('vatin')}
            error={this.state.fieldErrors.vatin} />
        </div>
        <div className="address-field__item">
          <InputField
            label={<FormattedMessage {...messages.address} />}
            labelWeight={this.props.labelWeight}
            value={this.state.address.addressLine1}
            onChange={() => this.handleFieldChange('addressLine1')}
            error={this.state.fieldErrors.addressLine1} />
        </div>
        <div className="address-field__address-line2">
          <InputField
            labelWeight={this.props.labelWeight}
            value={this.state.address.addressLine2}
            onChange={() => this.handleFieldChange('addressLine2')}
            error={this.state.fieldErrors.addressLine2} />
        </div>
        <div className="address-field__item">
          <InlineItems>
            <InputField
              label={<FormattedMessage {...messages.postalCode} />}
              labelWeight={this.props.labelWeight}
              value={this.state.address.postalCode}
              onChange={() => this.handleFieldChange('postalCode')}
              error={this.state.fieldErrors.postalCode} />
            <InputField
              label={<FormattedMessage {...messages.city} />}
              labelWeight={this.props.labelWeight}
              value={this.state.address.city}
              onChange={() => this.handleFieldChange('city')}
              error={this.state.fieldErrors.city} />
          </InlineItems>
        </div>
        <div className="address-field__item">
          <InlineItems>
            <InputField
              label={<FormattedMessage {...messages.state} />}
              labelWeight={this.props.labelWeight}
              value={this.state.address.state}
              onChange={() => this.handleFieldChange('state')}
              error={this.state.fieldErrors.state} />
            <Select
              label={<FormattedMessage {...messages.country} />}
              placeholder
              options={countryOptions}
              labelWeight={this.props.labelWeight}
              value={this.state.address.country}
              onChange={() => this.handleFieldChange('country')}
              error={this.state.fieldErrors.country} />
          </InlineItems>
        </div>
        {this.props.onCancel || this.props.onSubmit ?
          <div className="address-field__item">
            <InlineItems>
              <div>
                {this.props.onCancel ?
                  <Button
                    type="default"
                    onClick={this.props.onCancel}
                    disabled={this.props.disabled}
                    loading={this.props.loading}>
                    {this.props.cancelLabel || <FormattedMessage {...messages.cancel} />}
                  </Button>
                  :
                  null
                }
              </div>
              <div>
                {this.props.onSubmit ?
                  <Button
                    type="primary"
                    disabled={this.props.disabled}
                    onClick={this.handleSubmitClick}
                    loading={this.props.loading}>
                    {this.props.submitLabel || <FormattedMessage {...messages.submit} />}
                  </Button>
                  :
                  null
                }
              </div>
            </InlineItems>
          </div>
          :
          null
        }
      </div>
    );
  }
}

AddressField.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  savedAddresses: undefined,
  address: undefined,
  labelWeight: undefined,
  disabled: undefined,
  loading: undefined,
  cancelLabel: undefined,
  submitLabel: undefined,
};

AddressField.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  savedAddresses: PropTypes.array,
  address: PropTypes.Object,
  labelWeight: PropTypes.any,
  disabled: PropTypes.any,
  loading: PropTypes.any,
  cancelLabel: PropTypes.any,
  submitLabel: PropTypes.any,
};

/**
 * Exports
 */
export default AddressField;

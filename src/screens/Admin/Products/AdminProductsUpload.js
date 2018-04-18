/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';


// Required components
import Button from '../../../components/common/buttons/Button';
import Select from '../../../components/common/forms/Select';
import Text from '../../../components/common/typography/Text';

// Translation data for this component
import messages from './AdminProductsUpload.messages';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class AdminProductsUpload extends React.Component {
  constructor(props) {
    super(props);

    // Intial state
    this.state = {
      content: undefined,
      file: undefined,
      fieldErrors: {}
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AdminProductsUpload.scss');
  }

  // View Controllers
  handleTypeChange = (value) => {
    this.setState({ type: value });
  };

  handleFileChange = (evt) => {
    this.setState({ file: evt.target.files[0] });
  };

  handleSubmitClick = () => {
    const fieldErrors = {};
    if (!this.state.type) {
      fieldErrors.type = <FormattedMessage {...messages.fieldRequired} />;
    }
    if (!this.state.file) {
      fieldErrors.file = <FormattedMessage {...messages.fieldRequired} />;
    }
    this.setState({ fieldErrors });

    if (Object.keys(fieldErrors).length === 0) {
      this.props.onSubmitClick({
        resource: this.state.type,
        file: this.state.file
      });
    }
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const uploadTypeOptions = [
      { name: <FormattedMessage {...messages.catalog} />, value: 'catalog' },
      { name: <FormattedMessage {...messages.images} />, value: 'images' }
    ];

    //
    // Return
    //
    return (
      <div className="admin-products-upload">
        <div className="admin-products-upload__form-item">
          <Select label={<FormattedMessage {...messages.type} />}
            placeholder
            options={uploadTypeOptions}
            onChange={this.handleTypeChange}
            error={this.state.fieldErrors.type} />
        </div>
        <div className="admin-products-upload__form-item">
          <input type="file" className="admin-products-upload__input" onChange={this.handleFileChange} />
          {this.state.fieldErrors.file ?
            <div className="admin-products-upload__error">
              <Text size="small">{this.state.fieldErrors.file}</Text>
            </div>
            :
            null
          }
        </div>
        <div className="admin-products-upload__actions">
          <div className="admin-products-upload__button">
            <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
              <FormattedMessage {...messages.cancel} />
            </Button>
          </div>
          <div className="admin-products-upload__button">
            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
              <FormattedMessage {...messages.submit} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


AdminProductsUpload.defaultProps = {
  onCancelClick: () => debug('onCancelClick not defined'),
  onSubmitClick: (data) => debug(`onSubmitClick not defined. Value: ${data}`),
  loading: undefined,
};

AdminProductsUpload.propTypes = {
  onCancelClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  loading: PropTypes.any,
};

/**
 * Exports
 */
export default AdminProductsUpload;

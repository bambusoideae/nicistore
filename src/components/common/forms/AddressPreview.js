/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


import { FormattedMessage } from 'react-intl';


// Required components
// import Button from '../buttons/Button';
import Text from '../typography/Text';

// Translation data for this component
import messages from './AddressPreview.messages';

/**
 * Component
 */
class AddressPreview extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AddressPreview.scss');
  }

  // Template
  render() {
    return (
      <div className="address-preview">
        <div className="address-preview__name">
          <Text weight="bold">{this.props.address.name}</Text>
        </div>
        {this.props.address.phone ?
          <div className="address-preview__phone">
            <Text size="small">{this.props.address.phone}</Text>
          </div>
          :
          null
        }
        {this.props.address.vatin ?
          <div className="address-preview__vatin">
            <Text>
              <FormattedMessage {...messages.vatLabel} />: {this.props.address.vatin}
            </Text>
          </div>
          :
          null
        }
        <div className="address-preview__address-line-1">
          <Text>{this.props.address.addressLine1}</Text>
        </div>
        {this.props.address.addressLine2 ?
          <div className="address-preview__address-line-2">
            <Text>{this.props.address.addressLine2}</Text>
          </div>
          :
          null
        }
        <div className="address-preview__postal-code">
          <Text>{this.props.address.postalCode}</Text>
        </div>
        <div className="address-preview__city">
          <Text>{this.props.address.city}</Text>
        </div>
        {this.props.address.state ?
          <div className="address-preview__state">
            <Text>{this.props.address.state}</Text>
          </div>
          :
          null
        }
        <div className="address-preview__country">
          <Text>{this.props.address.country}</Text>
        </div>
        <div className="address-preview__actions">
          {this.props.onEditClick ?
            <div className="address-preview__edit" onClick={this.props.onEditClick} role="button" tabIndex="0">
              <Text weight="bold">
                <FormattedMessage {...messages.edit} />
              </Text>
            </div>
            :
            null
          }
          {this.props.onDeleteClick ?
            <div className="address-preview__delete" onClick={this.props.onDeleteClick} role="button" tabIndex="0">
              <Text>
                <FormattedMessage {...messages.delete} />
              </Text>
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

AddressPreview.defaultProps = {
  onEditClick: () => {},
  onDeleteClick: () => {},
  address: undefined,
};

AddressPreview.propTypes = {
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  address: PropTypes.any,
};

/**
 * Exports
 */
export default AddressPreview;

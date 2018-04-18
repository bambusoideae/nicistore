/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';


// Required components
import Label from '../indicators/Label';
import StatusIndicator from '../indicators/StatusIndicator';

// Translation data for this component
import messages from './OrderStatus.messages';

/**
 * Component
 */
class OrderStatus extends React.Component {
  // Helper
  getStatusMessage(status) {
    if (['created', 'pendingPayment', 'paymentError', 'paid', 'processing', 'ready', 'shipped'].indexOf(status) !== -1) {
      return status;
    }

    return 'created';
  }

  // Template
  render() {
    //
    // Component configurable props
    //

    let labelSize = 'small';
    if (['medium', 'large'].indexOf(this.props.labelSize) !== -1) {
      labelSize = this.props.labelSize;
    }

    let labelType = 'default';
    let labelWeight = 'normal';
    switch (this.props.status) {
      case 'created':
        labelType = 'dark';
        break;
      case 'pendingPayment':
        labelType = 'warning';
        break;
      case 'paymentError':
        labelType = 'error';
        break;
      case 'paid':
        labelType = 'success';
        break;
      case 'processing':
        labelType = 'primary';
        break;
      case 'ready':
        labelType = 'info';
        break;
      case 'shipped':
        labelWeight = 'bold';
        break;
      default:
        break;
    }

    //
    // Helper methods & variables
    //

    //
    // Return
    //
    return (
      <div className="order-status">
        {this.props.label !== false ?
          <Label type={labelType} size={labelSize} weight={labelWeight}>
            {/* {this.props.status} */}
            <FormattedMessage {...messages[this.getStatusMessage(this.props.status)]} />
          </Label>
          :
          <StatusIndicator status={labelType} />
        }
      </div>
    );
  }
}

OrderStatus.defaultProps = {
  labelSize: 'small',
  label: undefined,
  status: undefined,
};

OrderStatus.propTypes = {
  labelSize: PropTypes.string,
  label: PropTypes.any,
  status: PropTypes.string,
};

/**
 * Exports
 */
export default OrderStatus;

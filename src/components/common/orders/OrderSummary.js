/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, FormattedNumber } from 'react-intl';


// Required components
import Breakpoint from '../../core/Breakpoint';
import Text from '../../common/typography/Text';

// Translation data for this component
import messages from './OrderSummary.messages';

/**
 * Component
 */
class OrderSummary extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./OrderSummary.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //

    //
    // Return
    //
    /* eslint-disable react/style-prop-object */
    return (
      <div className="order-summary">
        <div className="order-summary__list">
          <div className="order-summary__row order-summary__item-labels">
            <div className="order-summary__list-name">
              <Text size="small">
                <FormattedMessage {...messages.name} />
              </Text>
            </div>
            <div className="order-summary__list-quantity-price">
              <Text size="small">
                <FormattedMessage {...messages.quantityAndPrice} />
              </Text>
            </div>
            <div className="order-summary__list-total">
              <Text size="small">
                <FormattedMessage {...messages.total} />
              </Text>
            </div>
          </div>
          {this.props.checkout.cart.products.map((product, idx) => {
            return (
              <div key={product.id || product._id || idx} className="order-summary__row order-summary__item">
                <div className="order-summary__list-name">
                  <Breakpoint point="handhelds">
                    <Text size="small">
                      {product.details.name}
                    </Text>
                  </Breakpoint>
                  <Breakpoint point="medium-screens">
                    <Text>
                      {product.details.name}
                    </Text>
                  </Breakpoint>
                  <Breakpoint point="wide-screens">
                    <Text>
                      {product.details.name}
                    </Text>
                  </Breakpoint>
                </div>
                <div className="order-summary__list-quantity-price">
                  <Text>
                    {product.quantity}
                  </Text>
                  &nbsp;x&nbsp;
                  <Text>
                    <FormattedNumber
                      value={product.details.pricing.retail}
                      style="currency"
                      currency={product.details.pricing.currency} />
                  </Text>
                </div>
                <div className="order-summary__list-total">
                  <Text>
                    <FormattedNumber
                      value={product.quantity * product.details.pricing.retail}
                      style="currency"
                      currency={product.details.pricing.currency} />
                  </Text>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-summary__totals">
          <div className="order-summary__row">
            <div className="order-summary__totals-label">
              <Text>
                <FormattedMessage {...messages.subTotal} />
              </Text>
            </div>
            <div className="order-summary__totals-value">
              <Text>
                <FormattedNumber
                  value={this.props.checkout.subTotal}
                  style="currency"
                  currency={this.props.checkout.currency} />
              </Text>
            </div>
          </div>
          <div className="order-summary__row">
            <div className="order-summary__totals-label">
              <Text>
                <FormattedMessage {...messages.shipping} />
              </Text>
            </div>
            <div className="order-summary__totals-value">
              {this.props.checkout.shippingCost ?
                <Text>
                  <FormattedNumber
                    value={this.props.checkout.shippingCost}
                    style="currency"
                    currency={this.props.checkout.currency} />
                </Text>
                :
                <Text>-</Text>
              }
            </div>
          </div>
          <div className="order-summary__row">
            <div className="order-summary__totals-label">
              <Text weight="bold">
                <FormattedMessage {...messages.total} />
              </Text>
            </div>
            <div className="order-summary__totals-value">
              <Text weight="bold">
                <FormattedNumber
                  value={this.props.checkout.total}
                  style="currency"
                  currency={this.props.checkout.currency} />
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

OrderSummary.defaultProps = {
  checkout: undefined,
};

OrderSummary.propTypes = {
  checkout: PropTypes.any,
};

/**
 * Exports
 */
export default OrderSummary;

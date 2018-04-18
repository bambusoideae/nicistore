/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';


// Required components
import AddressPreview from '../forms/AddressPreview';
import Breakpoint from '../../core/Breakpoint';
import Heading from '../typography/Heading';
import Table from '../tables/Table';
import Text from '../typography/Text';

import OrderStatus from './OrderStatus';

// Translation data for this component
import messages from './OrderDetails.messages';

/**
 * Component
 */
class OrderDetails extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./OrderDetails.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params

    // Order products list table
    const headings = [
      <FormattedMessage {...messages.nameHeading} />,
      <span>ID</span>,
      <FormattedMessage {...messages.skuHeading} />,
      <FormattedMessage {...messages.quantityHeading} />,
      <FormattedMessage {...messages.priceHeading} />
    ];

    let rows = this.props.order.checkout.cart.products.map((product) => {
      /* eslint-disable react/style-prop-object */
      return {
        data: [
          <Text size="medium">
            {product.details.name}
          </Text>,
          <span className="order-details__link">
            <Link to="product" params={Object.assign({ productId: product.id }, routeParams)}>
              <Text size="small">{product.id}</Text>
            </Link>
          </span>,
          <Text size="medium">{product.details.sku}</Text>,
          <Text size="medium">{product.quantity}</Text>,
          <FormattedNumber value={product.details.pricing.retail}
            style="currency"
            currency={this.props.order.checkout.currency} />
        ]
      };
      /* eslint-enable */
    });

    //
    // Return
    //
    /* eslint-disable react/style-prop-object */
    return (
      <div className="order-details">
        <div className="order-details__overview">
          {this.props.customerDetails !== false ?
            <div className="order-details__overview-item">
              <div className="order-details__overview-item-label">
                <Text size="medium" weight="bold">
                  <FormattedMessage {...messages.customer} />
                </Text>
              </div>
              <div className="order-details__overview-item-value">
                <Text size="medium">
                  {this.props.order.customer.name} ({this.props.order.customer.email})
                  {this.props.order.customer.userId ?
                    <span className="order-details__user-icon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </span>
                    :
                    null
                  }
                </Text>
              </div>
            </div>
            :
            null
          }
          <div className="order-details__overview-item">
            <div className="order-details__overview-item-label">
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.createdAt} />:
              </Text>
            </div>
            <div className="order-details__overview-item-value">
              <Text size="medium">
                {moment(this.props.order.createdAt).format('YYYY/MM/DD HH:mm:ss')}
              </Text>
            </div>
          </div>
          <div className="order-details__overview-item">
            <div className="order-details__overview-item-label">
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.id} />:
              </Text>
            </div>
            <div className="order-details__overview-item-value">
              <Text size="small">
                {this.props.order.id}
              </Text>
            </div>
          </div>
          <div className="order-details__overview-item">
            <div className="order-details__overview-item-label">
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.status} />:
              </Text>
            </div>
            <div className="order-details__overview-item-value">
              <OrderStatus status={this.props.order.status} />
            </div>
          </div>
        </div>
        <div className="order-details__detail">
          <Heading size="medium">
            <FormattedMessage {...messages.billingDetails} />
          </Heading>
          <div className="order-details__detail-content">
            <div>
              <AddressPreview address={this.props.order.checkout.billingAddress} />
            </div>
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.paymentMethod} />:
              </Text>
              <br />
              <Text size="medium">{this.props.order.checkout.paymentMethod}</Text>
            </div>
          </div>

        </div>
        <div className="order-details__detail">
          <Heading size="medium">
            <FormattedMessage {...messages.shippingDetails} />
          </Heading>
          <div className="order-details__detail-content">
            <div>
              <AddressPreview address={this.props.order.checkout.shippingAddress} />
            </div>
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.shippingMethod} />:
              </Text>
              <br />
              <Text size="medium">{this.props.order.checkout.shippingMethod}</Text>
              <br />
              <br />
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.shippingCost} />:
              </Text>
              <br />
              <Text size="medium">
                <FormattedNumber value={this.props.order.checkout.shippingCost}
                  style="currency"
                  currency={this.props.order.checkout.currency} />
              </Text>
            </div>
          </div>
        </div>
        <div className="order-details__detail">
          <Heading size="medium">
            <FormattedMessage {...messages.products} />
          </Heading>
          <div className="order-details__detail-content">
            <Breakpoint point="handhelds">
              {rows.map((row, idx) => {
                return (
                  <div key={row.id || row._id || idx} className="order-details__product-block">
                    <div className="order-details__product-name">
                      {row.data[0]}
                    </div>
                    <div className="order-details__product-quantity">
                      {row.data[3]}&nbsp;x&nbsp;{row.data[4]}
                    </div>
                  </div>
                );
              })}
            </Breakpoint>
            <Breakpoint point="medium-screens">
              <Table headings={headings} rows={rows} />
            </Breakpoint>
            <Breakpoint point="wide-screens">
              <Table headings={headings} rows={rows} />
            </Breakpoint>
          </div>
          <div className="order-details__detail-content order-details__detail-content--column">
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.subTotal} />:
              </Text>
              <br />
              <FormattedNumber value={this.props.order.checkout.subTotal}
                style="currency"
                currency={this.props.order.checkout.currency} />
            </div>
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.shipping} />:
              </Text>
              <br />
              <FormattedNumber value={this.props.order.checkout.shippingCost}
                style="currency"
                currency={this.props.order.checkout.currency} />
            </div>
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.vat} />:
              </Text>
              <br />
              <FormattedNumber value={this.props.order.checkout.vatTotal}
                style="currency"
                currency={this.props.order.checkout.currency} />
            </div>
            <div>
              <Text size="medium" weight="bold">
                <FormattedMessage {...messages.total} />:
              </Text>
              <br />
              <FormattedNumber value={this.props.order.checkout.total}
                style="currency"
                currency={this.props.order.checkout.currency} />
            </div>
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

OrderDetails.defaultProps = {
  order: undefined,
  customerDetails: undefined,
};

OrderDetails.propTypes = {
  order: PropTypes.any,
  customerDetails: PropTypes.any,
};

/**
 * Exports
 */
export default OrderDetails;

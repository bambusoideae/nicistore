/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// Selectors
import { selectCartItems, selectCartStatus } from '../../../selectors/cart';

// Actions
import { triggerDrawer } from '../../../actions/drawer';


// Required components
import Button from '../buttons/Button';
import CartItem from './CartItem';
import Heading from '../typography/Heading';
import Text from '../typography/Text';

// Translation data for this component
import messages from './SideCart.messages';


/**
 * Component
 */
class SideCart extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./SideCart.scss');
  }

  // Template
  render() {
    //
    // Helper methods and variables
    //
    const { handleContinueShoppingClick, handleCheckoutClick, handleQuantityChange } = this.props;
    const { cart, cartLoading } = this.props;
    const routeParams = {}; // Base route params

    // Process Subtotal
    const subTotal = { value: 0, currency: undefined };
    if (cart && cart.products.length > 0) {
      cart.products.forEach((product) => {
        if (!subTotal.currency) {
          subTotal.currency = product.details.pricing.currency;
        }
        subTotal.value += product.details.pricing.retail * product.quantity;
      });
    }

    //
    // Return
    //
    /* eslint-disable react/style-prop-object */
    return (
      <div className="side-cart">
        {cart && cart.products.length > 0 ?
          <div>
            <div className="side-cart__header">
              <Heading size="small">
                <FormattedMessage {...messages.header} />
              </Heading>
            </div>
            <div className="side-cart__products">
              {cart.products.map((product) => {
                return (
                  <div className="side-cart__item">
                    <CartItem product={product}
                      onQuantityChange={() => handleQuantityChange(product)} />
                  </div>
                );
              })}
            </div>
            <div className="side-cart__subtotal">
              <div className="side-cart__subtotal-label">
                <Text size="medium" transform="uppercase" weight="bold">
                  <FormattedMessage {...messages.subtotal} />
                </Text>
              </div>
              <div className="side-cart__subtotal-value">
                <Text size="medium">
                  <FormattedNumber value={subTotal.value}
                    style="currency"
                    currency={subTotal.currency} />
                </Text>
              </div>
            </div>
            <div className="side-cart__actions">
              <div className="side-cart__btn">
                {!cartLoading ?
                  <Link to="checkout" params={routeParams}>
                    <Button type="primary" onClick={handleCheckoutClick} disabled={cartLoading}>
                      <FormattedMessage {...messages.checkout} />
                    </Button>
                  </Link>
                  :
                  <Button type="primary" disabled={true}>
                    <FormattedMessage {...messages.checkout} />
                  </Button>
                }
              </div>
            </div>
          </div>
          :
          <div className="side-cart__empty">
            <div className="side-cart__empty-action" onClick={handleContinueShoppingClick} role="presentation">
              <Text size="small">
                <FormattedMessage {...messages.continueShopping} />
              </Text>
            </div>
            <div className="side-cart__empty-message">
              <Text size="medium" transform="uppercase">
                <FormattedMessage {...messages.emptyCart} />
              </Text>
            </div>
          </div>
        }
      </div>
    );
    /* eslint-enable */
  }
}

SideCart.defaultProps = {
  handleContinueShoppingClick: () => {},
  handleCheckoutClick: () => {},
  handleQuantityChange: () => {},
  cart: undefined,
  cartLoading: undefined,
};

SideCart.propTypes = {
  handleContinueShoppingClick: PropTypes.func,
  handleCheckoutClick: PropTypes.func,
  handleQuantityChange: PropTypes.func,
  cart: PropTypes.any,
  cartLoading: PropTypes.any,
};


/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  cartLoading: selectCartStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleContinueShoppingClick: () => {
      dispatch(triggerDrawer(null));
    },
    handleCheckoutClick: () => {
      dispatch(triggerDrawer(null));
    },
    handleQuantityChange: (product, value) => {
      console.log('TODO: implement handleQuantityChange in SideCart component');
      // let payload = Object.assign({ details: product.details }, {
      //   id: product.id,
      //   quantity: value
      // });
      // this.context.executeAction(addToCart, payload);
    },
  };
};

const SideCartWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideCart);

/**
 * Exports
 */
export default SideCartWrapper;

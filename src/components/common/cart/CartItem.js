/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// Selectors

// Actions
import { triggerDrawer } from '../../../actions/drawer';

// Required components
import QuantitySelector from '../forms/QuantitySelector';
import Text from '../typography/Text';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class CartItem extends React.Component {
  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      placeholderImage: require('../images/image_placeholder.png'),
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./CartItem.scss');
  }

  // Template
  render() {
    const { handleLinkClick, onQuantityChange } = this.props;
    const product = this.props.product.details;
    const linkParams = {
      productId: product.id
    };

    /* eslint-disable react/style-prop-object */
    return (
      <div className="cart-item">
        <div className="cart-item__frame">
          <Link className="cart-item__link"
            to="product"
            params={linkParams}
            onClick={handleLinkClick}>
            <img alt={product.name} className="cart-item__image" src={product.images && product.images.length > 0 ? `//${product.images[0].url}` : this.state.placeholderImage} />
          </Link>
        </div>
        <div className="cart-item__details">
          <div className="name">
            <Text size="small">
              <Link className="cart-item__link"
                to="product"
                params={linkParams}
                onClick={handleLinkClick}>
                {product.name}
              </Link>
            </Text>
          </div>
          <div className="cart-item__price">
            <Text size="small" weight="bold">
              <FormattedNumber value={product.pricing.retail}
                style="currency"
                currency={product.pricing.currency} />
            </Text>
          </div>
          <div className="cart-item__quantity">
            <QuantitySelector value={this.props.product.quantity}
              onChange={onQuantityChange} />
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

CartItem.defaultProps = {
  handleLinkClick: () => {},
  onQuantityChange: (value) => { debug(`onQuantityChange not defined. Value: ${value}`); },
  product: undefined,
};

CartItem.propTypes = {
  handleLinkClick: PropTypes.func,
  onQuantityChange: PropTypes.func,
  product: PropTypes.any,
};


/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleLinkClick: () => {
      dispatch(triggerDrawer(null));
    }
  };
};

const CartItemWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);

/**
 * Exports
 */
export default CartItemWrapper;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';

import { slugify } from '../../../utils/strings';
import { getImageUrl, getImageDescription } from '../../../api/image';


// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      productPlaceholderImage: require('../images/image_placeholder.png')
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ProductListItem.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    // Base route params
    const routeParams = {};

    // Link params for this product
    const linkParams = Object.assign({
      productId: this.props.product._id,
      productSlug: slugify(this.props.product.name)
    }, routeParams);

    //
    // Return
    //
    /* eslint-disable react/style-prop-object */
    return (
      <div className="product-list-item" itemScope itemType="http://schema.org/Product">
        <Link to={`/products/${linkParams.productId}`}>
          <div className="product-list-item__image">
            {this.props.product.images && this.props.product.images.length > 0 ?
              <span style={{ display: 'none' }} itemProp="image">
                {getImageUrl(this.props.product.images[0])}
              </span>
              :
              null
            }
            {this.props.product.images && this.props.product.images.length > 0 ?
              <img src={getImageUrl(this.props.product.images[0])} alt={getImageDescription(this.props.product.images[0])} />
              :
              <img src={this.state.productPlaceholderImage} alt={this.state.productPlaceholderImage} />
            }
          </div>
          <div className="product-list-item__name" itemProp="name">
            <Text size="small">
              {this.props.product.name}
            </Text>
            <span style={{ display: 'none' }} itemProp="sku">{this.props.product.sku}</span>
          </div>
          {this.props.product.pricing ?
            <div className="product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
              <div style={{ display: 'none' }} itemProp="price">
                {this.props.product.pricing.retail}
              </div>
              <div style={{ display: 'none' }} itemProp="priceCurrency">
                {this.props.product.pricing.currency}
              </div>
              <div>
                <Text size="medium" weight="bold">
                  <FormattedNumber
                    value={this.props.product.pricing.retail}
                    style="currency"
                    currency={this.props.product.pricing.currency} />
                </Text>
              </div>
            </div>
            :
            null
          }
        </Link>
      </div>
    );
    /* eslint-enable */
  }
}

ProductListItem.defaultProps = {
  product: undefined,
};

ProductListItem.propTypes = {
  product: PropTypes.any,
};

/**
 * Exports
 */
export default ProductListItem;

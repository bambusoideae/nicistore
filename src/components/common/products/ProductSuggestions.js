/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { slugify } from '../../../utils/strings';


// Required components
import Heading from '../typography/Heading';
import Spinner from '../indicators/Spinner';
import Text from '../typography/Text';

/**
 * Component
 */
class ProductSuggestions extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      placeholderImage: require('../images/image_placeholder.png')
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ProductSuggestions.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    let routeParams = {}; // Base route params

    //
    // Return
    //
    return (
      <div className="product-suggestions">
        {this.props.children ?
          <Heading size="small" align="center">{this.props.children}</Heading>
          :
          null
        }
        {this.props.loading ?
          <div className="product-suggestions__loading">
            <Spinner />
          </div>
          :
          <div className="product-suggestions__list">
            {this.props.products.map((product, idx) => {
              let params = Object.assign({
                productId: product.id,
                productSlug: slugify(product.name)
              }, routeParams);
              let image = (product.images && product.images.length > 0) ? `//${product.images[0].url}` : this.state.placeholderImage;
              return (
                <div key={product.id || product._id || idx} className="product-suggestions__item">
                  <Link to="product-slug" params={params}>
                    <div className="product-suggestions__item-image">
                      <img src={image} alt={image} />
                    </div>
                    <div className="product-suggestions__item-name">
                      <Text size="small">
                        {product.name}
                      </Text>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

ProductSuggestions.defaultProps = {
  children: undefined,
  loading: undefined,
  products: undefined,
};

ProductSuggestions.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  products: PropTypes.any,
};

/**
 * Exports
 */
export default ProductSuggestions;

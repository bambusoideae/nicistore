/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage, FormattedNumber } from 'react-intl';


import { createStructuredSelector } from 'reselect';

// Selectors
// import { selectOpenedDrawer } from '../selectors/drawer';
import { selectProductDetails, selectProductStatus } from '../../selectors/product';
import { selectCartStatus, selectCartItems } from '../../selectors/cart';


// Actions
import { triggerDrawer } from '../../actions/drawer';
import { fetchProduct } from '../../actions/product';
import { addProductToCart } from '../../actions/cart';


import { slugify } from '../../utils/strings';
import { getImageUrl, getImageDescription } from '../../api/image';

// Required components
import ArticleSummary from '../../components/common/articles/ArticleSummary';
import Breadcrumbs from '../../components/common/navigation/Breadcrumbs';
import Button from '../../components/common/buttons/Button';
import Heading from '../../components/common/typography/Heading';
import ImageGallery from '../../components/common/images/ImageGallery';
import NotFound from '../NotFound/NotFound';
import ProductSuggestions from '../../components/common/products/ProductSuggestions';
import QuantitySelector from '../../components/common/forms/QuantitySelector';
import Text from '../../components/common/typography/Text';

// Translation data for this component
import messages from './ProductPage.messages';

/**
 * Component
 */
class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      // cartLoading: this.context.getStore(CartStore).isLoading(),
      // cartProducts: this.context.getStore(CartStore).getProducts(),
      // product: this.context.getStore(ProductDetailsStore).getProduct(),
      // contents: this.context.getStore(ProductContentsStore).getContents(),
      addingToCart: false,
      // suggestions: this.context.getStore(ProductSuggestionsStore).getProducts(),
      // suggestionsLoading: this.context.getStore(ProductSuggestionsStore).isLoading(),
      placeholderImage: require('../../components/common/images/image_placeholder.png'),
      quantity: 1
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ProductPage.scss');

    // If product has main collection, trigger fetching of cross-sell products
    // if (product && product.metadata && product.metadata.mainCollection) {
    //   this.context.executeAction(fetchProductSuggestions, product);
    // } else {
    //   this.context.executeAction(clearSuggestionsList);
    // }
    const productId = this.props.match.params.productId;
    this.props.onLoadProduct(productId);
  }

  componentWillReceiveProps(nextProps) {
    // --------------------- THIS IS VERY USEFUL TO READ! ---------------------
    // If product changed (because component is being "re-used") act accordingly
    // ------------------------------------------------------------------------
    if (this.state.product && nextProps.product && this.state.product.id !== nextProps.product.id) {
      // Reset quantity
      this.setState({ quantity: 1 });

      // If product has main collection, trigger fetching of cross-sell products
      // if (nextProps._product && nextProps._product.metadata && nextProps._product.metadata.mainCollection) {
      //   this.context.executeAction(fetchProductSuggestions, nextProps._product);
      // } else {
      //   this.context.executeAction(clearSuggestionsList);
      // }
    }

    // Check for cart changes when we flagged that we were adding to cart
    if (this.state.addingToCart && this.state.cartLoading && !nextProps.cartLoading) {
      this.setState({
        addingToCart: false,
        quantity: 1
      });
      this.props.toggleCartDrawer();
    }

    this.setState({
      cartLoading: nextProps.cartLoading,
      cartProducts: nextProps.cartProducts,
      product: nextProps.product,
      suggestions: nextProps.suggestions,
      suggestionsLoading: nextProps.suggestionsLoading
    });
  }

  // Helper Methods
  getQuantityInCart = () => {
    let quantity = 0;
    if (this.props.product) {
      this.props.cartProducts.filter((product) => {
        return product.id === this.props.product.id;
      }).forEach((product) => {
        quantity += product.quantity;
      });
    }
    return quantity;
  };

  // View Controllers
  handleAddToCartClick = () => {
    const payload = Object.assign({ details: this.state.product }, {
      id: this.state.product.id,
      quantity: this.getQuantityInCart() + this.state.quantity
    });
    this.setState({ addingToCart: true });
    this.props.addProductToCart(payload);
  };

  handleQuantityChange = (value) => {
    this.setState({ quantity: value });
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const { product, suggestions, suggestionsLoading } = this.props;

    // Breadcrumbs
    const breadcrumbs = [
      {
        name: <FormattedMessage {...messages.homepage} />,
        to: 'homepage',
      },
      {
        name: <FormattedMessage {...messages.productsList} />,
        to: 'products',
      }
    ];

    const addCollectionToBreadcrumbs = (collectionId) => {
      // let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
      const collection = undefined;
      if (collection) {
        breadcrumbs.push({
          name: collection.name,
          to: 'collection-slug',
          params: Object.assign({}, {
            collectionId: collection.id,
            collectionSlug: slugify(collection.name)
          })
        });
      }
    };

    // Stuff that only makes sense (and will crash otherwise) if product exists
    if (product) {
      // Look for Main Category
      if (product.metadata && product.metadata.mainCategory) {
        addCollectionToBreadcrumbs(product.metadata.mainCategory);
      }

      // Look for Main Collection
      if (product.metadata && product.metadata.mainCollection) {
        addCollectionToBreadcrumbs(product.metadata.mainCollection);
      }
    }

    //
    // Return
    //
    /* eslint-disable react/style-prop-object */
    return (
      <div className="product-page">
        {!product ?
          <NotFound />
          :
          <div>
            <div className="product-page__header">
              <Breadcrumbs links={breadcrumbs} weight="bold">
                {product.name}
              </Breadcrumbs>
            </div>

            <div className="product-page__product" itemScope itemType="http://schema.org/Product">
              <div className="product-page__gallery-container">
                {product.images && product.images.length > 0 ?
                  <div className="product-page__gallery">
                    <span style={{ display: 'none' }} itemProp="image">
                      {getImageUrl(product.images[0])}
                    </span>
                    <ImageGallery key={product.id} images={product.images} getImageUrl={getImageUrl} getImageDescription={getImageDescription} />
                  </div>
                  :
                  <div className="product-page__gallery">
                    <img src={this.state.placeholderImage} alt="No product" />
                  </div>
                }
              </div>
              <div className="product-page__details">
                <div className="product-page__name" itemProp="name">
                  <Heading size="large">
                    {product.name}
                  </Heading>
                </div>
                {product.pricing ?
                  <div className="product-page__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                    <div style={{ display: 'none' }} itemProp="price">
                      {product.pricing.retail}
                    </div>
                    <div style={{ display: 'none' }} itemProp="priceCurrency">
                      {product.pricing.currency}
                    </div>
                    <div>
                      <Text size="medium" weight="bold">
                        <FormattedNumber
                          value={product.pricing.retail}
                          style="currency"
                          currency={product.pricing.currency} />
                      </Text>
                    </div>
                  </div>
                  :
                  null
                }
                <div className="product-page__sku">
                  <Text size="small">
                    Ref: <span itemProp="sku">{product.sku}</span>
                  </Text>
                </div>
                <div className="product-page__add">
                  <div className="product-page__quantity">
                    <QuantitySelector value={this.state.quantity}
                      onChange={this.handleQuantityChange} />
                  </div>
                  <div className="product-page__add-buttons">
                    {product.stock > 0 ?
                      <Button type="primary"
                        onClick={this.handleAddToCartClick}
                        disabled={this.state.quantity <= 0 || this.state.cartLoading}>
                        <FormattedMessage {...messages.addToCart} />
                      </Button>
                      :
                      <Button type="primary" disabled={true}>
                        <FormattedMessage {...messages.outOfStock} />
                      </Button>
                    }
                  </div>
                </div>

                <div className="product-page__description">
                  <div className="product-page__description-label">
                    <Heading size="medium">
                      <FormattedMessage {...messages.descriptionLabel} />
                    </Heading>
                  </div>
                  <div className="product-page__description-content" itemProp="description">
                    <Text size="small">
                      {product.description}
                    </Text>
                  </div>
                </div>

                {product.contents && product.contents.map((content) => {
                  return (
                    <div className="product-page__content">
                      <ArticleSummary content={content} />
                    </div>
                  );
                })}
              </div>
              
              {!suggestionsLoading && (!suggestions || suggestions.length === 0) ?
                <div className="product-page__suggestions product-page__suggestions--no-border" />
                :
                <div className="product-page__suggestions">
                  <ProductSuggestions products={suggestions} loading={suggestionsLoading}>
                    <FormattedMessage {...messages.crossSell} />
                  </ProductSuggestions>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
    /* eslint-enable */
  }
}

ProductPage.defaultProps = {
  onLoadProduct: () => {},
  toggleCartDrawer: () => {},
  addProductToCart: () => {},
  match: undefined, // react-router
  localtion: undefined, // react-router
  history: undefined, // react-router
  cartLoading: undefined,
  cartProducts: undefined,
  product: undefined,
  suggestions: undefined,
  suggestionsLoading: undefined,
};

ProductPage.propTypes = {
  onLoadProduct: PropTypes.func,
  toggleCartDrawer: PropTypes.func,
  addProductToCart: PropTypes.func,
  match: PropTypes.any, // react-router
  localtion: PropTypes.any, // react-router
  history: PropTypes.any, // react-router
  cartLoading: PropTypes.any,
  cartProducts: PropTypes.any,
  product: PropTypes.object,
  suggestions: PropTypes.any,
  suggestionsLoading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  cartLoading: selectCartStatus,
  cartProducts: selectCartItems,
  product: selectProductDetails,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProduct: (productId) => {
      dispatch(fetchProduct(productId));
    },
    toggleCartDrawer: () => {
      dispatch(triggerDrawer('cart'));
    },
    addProductToCart: (product) => {
      dispatch(addProductToCart(product));
    }
  };
};

const ProductPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);

/**
 * Exports
 */
export default ProductPageWrapper;

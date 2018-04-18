import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// Selectors
import { selectProductItems } from '../../selectors/product';


// Actions
// import { triggerDrawer } from '../actions/drawer';
import { findProduct } from '../../actions/product';

import { slugify } from '../../utils/strings';

// Required components
import ArticleSummary from '../../components/common/articles/ArticleSummary';
import Carousel from '../../components/common/images/Carousel';
import ProductList from '../../components/common/products/ProductList';

import HomepageFeaturedCollection from './HomepageFeaturedCollection';


// Translation data for this component
import messages from './HomePage.messages';

class HomePage extends Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./HomePage.scss');

    // Change page title, meta data
    // Fetch data
    this.props.findProduct();
  }

  componentWillUnmount() {
    // Stop update data
  }

  render() {
    //
    // Helper methods & variables
    //
    // Base route params
    const routeParams = {};

    // Featured Collections
    const featuredCollections = [null, null, null, null];
    for (let i = 0; i < 4; i++) {
      if (this.props.collections[i]) {
        const collection = this.props.collections[i];
        featuredCollections[i] = {
          name: collection.name,
          link: {
            to: 'collection-slug',
            params: Object.assign({
              collectionId: collection.id,
              collectionSlug: slugify(collection.name)
            }, routeParams)
          }
        };
        if (collection.images && collection.images.length > 0) {
          featuredCollections[i].img = {
            src: `//${collection.images[0].url}`,
            alt: collection.name
          };
        }
      }
    }

    // Featured Products SideMenu
    const productFilters = () => {
      if (this.props.featuredCategories.length > 0 || this.props.featuredCollections.length > 0) {
        return [
          {
            name: { en: 'Categories', pt: 'Categorias' },
            collections: this.props.featuredCategories
          },
          {
            name: { en: 'Collections', pt: 'Colecções' },
            collections: this.props.featuredCollections
          }
        ];
      }
    };

    // Fetaured Products Title Component
    const featuredProductsTitle = () => (<FormattedMessage {...messages.productsList} />);

    //
    // Return
    //
    return (
      <div className="homepage">
        <div className="homepage__cta">
          <div className="homepage__featured">
            <div className="homepage__featured-block">
              <HomepageFeaturedCollection feature={featuredCollections[0]} />
              <HomepageFeaturedCollection feature={featuredCollections[1]} />
            </div>
            <div className="homepage__featured-block">
              <HomepageFeaturedCollection feature={featuredCollections[2]} />
              <HomepageFeaturedCollection feature={featuredCollections[3]} />
            </div>
          </div>

          <div className="homepage__banners">
            <Carousel images={this.props.banners.filter((banner) => {
              return banner.body && banner.body.image;
            }).map((banner) => {
              return {
                src: `//${banner.body.image.url}`,
                link: banner.body.link
              };
            })} />
          </div>
        </div>

        {this.props.articles.length > 0 ?
          <div className="homepage__articles">
            {this.props.articles.map((content, idx) => {
              const articleRouteParams = Object.assign({
                contentId: content.id,
                contentSlug: slugify(content.name)
              }, routeParams);
              /* eslint-disable react/no-array-index-key */
              return (
                <div key={idx} className="homepage__article-item">
                  <Link className="homepage__article-link"
                    to="article-slug"
                    params={articleRouteParams}>
                    <ArticleSummary key={idx} size="small" content={content} hideLink={true} />
                  </Link>
                </div>
              );
              /* eslint-enable */
            })}
          </div>
          :
          null
        }

        <div className="homepage__products">
          <ProductList title={featuredProductsTitle()}
            filters={productFilters()}
            products={this.props.featuredProducts} />
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  findProduct: () => {},
  banners: [],
  articles: [],
  collections: [],
  featuredCategories: [],
  featuredCollections: [],
  featuredProducts: [],
};

HomePage.propTypes = {
  findProduct: PropTypes.func,
  banners: PropTypes.array,
  articles: PropTypes.array,
  collections: PropTypes.array,
  featuredCategories: PropTypes.array,
  featuredCollections: PropTypes.array,
  featuredProducts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  featuredProducts: selectProductItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    findProduct: () => dispatch(findProduct())
  };
};

// Need update when route is change so don't miss withRouter
const HomePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageWrapper;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { slugify } from '../../../utils/strings';


// Required components
import Heading from '../typography/Heading';
import Pagination from '../navigation/Pagination';
import ProductListItem from './ProductListItem';
import Text from '../typography/Text';
import TreeMenu from '../navigation/TreeMenu';

// Translation data for this component
import messages from './ProductList.messages';


/**
 * Component
 */
class ProductList extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ProductList.scss');
  }

  // Template
  render() {
    const hasDescription = () => {
      return this.props.collection && this.props.collection.description;
    };

    return (
      <div className="product-list">
        {this.props.filters ?
          <div className="product-list__sidebar">
            {this.props.filters.map((item, idx) => {
              const links = item.collections.map((col) => {
                return {
                  name: col.name,
                  to: 'collection-slug',
                  params: {
                    collectionId: col.id,
                    collectionSlug: slugify(col.name)
                  },
                  selected: this.props.collection ? col.id === this.props.collection.id : false
                };
              });
              if (links.length > 0) {
                return (
                  <div key={item.id || item._id || idx} className="product-list__filter">
                    <TreeMenu links={links}>
                      {item.name}
                    </TreeMenu>
                  </div>
                );
              }

              return undefined;
            })}
          </div>
          :
          null
        }

        <div className="product-list__container">
          {this.props.title ?
            <div className="product-list__title">
              <Heading size="medium">{this.props.title}</Heading>
            </div>
            :
            null
          }
          {hasDescription() ?
            <div className="product-list__collection-description">
              <Text size="small">
                {this.props.collection.description}
              </Text>
            </div>
            :
            null
          }
          {this.props.children ?
            <div className="product-list__content">
              {this.props.children}
            </div>
            :
            null
          }
          <div className="product-list__items">
            {this.props.products.length > 0 ?
              this.props.products.map((item, idx) => {
                return (
                  <div key={item.id || item._id || idx} className="product-list__product-item">
                    <ProductListItem product={item} />
                  </div>
                );
              })
              :
              <div className="product-list__no-results">
                <Text size="medium">
                  <FormattedMessage {...messages.noResults} /> :(
                </Text>
              </div>
            }
          </div>
          {this.props.totalPages && this.props.currentPage && this.props.routeParams && this.props.totalPages > 1 ?
            <div className="product-list__pagination">
              <Pagination to={this.props.paginateTo || 'collection'}
                params={this.props.routeParams}
                totalPages={this.props.totalPages}
                currentPage={this.props.currentPage} />
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

ProductList.defaultProps = {
  collection: undefined,
  filters: undefined,
  title: undefined,
  children: undefined,
  products: undefined,
  totalPages: undefined,
  currentPage: undefined,
  routeParams: undefined,
  paginateTo: undefined,
};

ProductList.propTypes = {
  collection: PropTypes.any,
  filters: PropTypes.any,
  title: PropTypes.any,
  children: PropTypes.any,
  products: PropTypes.any,
  totalPages: PropTypes.number,
  currentPage: PropTypes.any,
  routeParams: PropTypes.any,
  paginateTo: PropTypes.any,
};

/**
 * Exports
 */
export default ProductList;

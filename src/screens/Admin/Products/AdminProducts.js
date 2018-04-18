/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// Selectors
// import { selectOpenedDrawer } from '../selectors/drawer';
import { selectProductItems } from '../../../selectors/product';


// Actions
// import { triggerDrawer } from '../actions/drawer';
import { addProduct, findAllProduct } from '../../../actions/product';

// Required components
import Button from '../../../components/common/buttons/Button';
import Heading from '../../../components/common/typography/Heading';
import Label from '../../../components/common/indicators/Label';
import Modal from '../../../components/common/modals/Modal';
import Spinner from '../../../components/common/indicators/Spinner';
import StatusIndicator from '../../../components/common/indicators/StatusIndicator';
import Table from '../../../components/common/tables/Table';
import Text from '../../../components/common/typography/Text';

import AdminProductsAddForm from './AdminProductsAddForm';
import AdminProductsUpload from './AdminProductsUpload';

// Translation data for this component
import messages from './AdminProducts.messages';

/**
 * Component
 */
class AdminProducts extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      showUploadModal: false,
      showNewProductModal: false,
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AdminProducts.scss');

    // Load required data
    // this.context.executeAction(fetchProducts, {perPage: 200, sort: 'sku'});
    this.props.findAllProduct();
  }

  componentWillReceiveProps(nextProps) {
    // If new product was being added and was successful, redirect to
    // product edit page
    // if (this.state.addProduct.loading === true
    //     && nextProps._addProduct.loading === false && !nextProps._addProduct.error) {
    //     let params = {
    //         locale: this.context.getStore(IntlStore).getCurrentLocale(),
    //         productId: nextProps._addProduct.product.id
    //     };
    //     this.context.router.transitionTo('adm-product-edit', params);
    // }

    // this.setState({
    //     addProduct: nextProps._addProduct,
    //     products: nextProps._products,
    //     loading: nextProps._loading
    // });
  }

  // View Controllers
  // Upload Modal
  handleUploadClick = () => {
    this.setState({ showUploadModal: true });
  };

  handleUploadCloseClick = () => {
    this.setState({ showUploadModal: false });
  };
  
  handleUploadSubmitClick = (data) => {
    // this.context.executeAction(productsUpload, data);
  };

  // New Product Modal

  handleNewProductClick = () => {
    this.setState({ showNewProductModal: true });
  };

  handleNewProductCloseClick = () => {
    this.setState({ showNewProductModal: false });
  };

  handleNewProductSubmitClick = (data) => {
    this.props.onAddProduct(data);
    // console.log(`New product: ${JSON.stringify(data)}`);
    // Close the modal
    this.setState({ showNewProductModal: false });
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params
    const { addProduct, products, loading } = this.props;

    const uploadModal = () => {
      if (this.state.showUploadModal) {
        return (
          <Modal title={<FormattedMessage {...messages.uploadModalTitle} />}
            onCloseClick={this.handleUploadCloseClick}>
            <AdminProductsUpload onCancelClick={this.handleUploadCloseClick}
              onSubmitClick={this.handleUploadSubmitClick} />
          </Modal>
        );
      }
    };

    const newProductModal = () => {
      if (this.state.showNewProductModal) {
        return (
          <Modal title={<FormattedMessage {...messages.newModalTitle} />}
            onCloseClick={this.handleNewProductCloseClick}>
            <AdminProductsAddForm
              loading={addProduct.loading}
              error={(addProduct.error && addProduct.error.validation) ? addProduct.error.validation.details : null}
              onCancelClick={this.handleNewProductCloseClick}
              onSubmitClick={this.handleNewProductSubmitClick} />
          </Modal>
        );
      }
    };

    const getProductSections = (product) => {
      return (
        <div className="admin-products__labels">
          {product.tags && product.tags.map((section, idx) => {
            return (
              <div key={section.id || idx} className="admin-products__label">
                <Label>
                  {section}
                </Label>
              </div>
            );
          })}
        </div>
      );
    };

    const headings = [
      <FormattedMessage {...messages.skuHeading} />,
      <FormattedMessage {...messages.nameHeading} />,
      <FormattedMessage {...messages.stockHeading} />,
      <FormattedMessage {...messages.imagesHeading} />,
      <FormattedMessage {...messages.sectionsHeading} />,
      <FormattedMessage {...messages.enabledHeading} />
    ];

    const rows = products.map((product) => {
      return {
        highlight: (product.enabled === true && product.images.length === 0) ? 'warning' : null,
        data: [
          <Text size="medium">{product.sku}</Text>,
          <span className="admin-products__link">
            <Link to={`/admin/products/${product._id}`}>
              {product.name || 'unknown'}
            </Link>
          </span>,
          <StatusIndicator status={(product.stock > 0) ? 'default' : 'error'} />,
          <StatusIndicator status={((product.images) && (product.images.length > 0)) ? 'default' : 'error'} />,
          <Text size="medium">{getProductSections(product)}</Text>,
          <StatusIndicator status={(product.enabled === true) ? 'success' : 'default'} />
        ]
      };
    });

    //
    // Return
    //
    return (
      <div className="admin-products">
        {uploadModal()}
        {newProductModal()}

        <div className="admin-products__header">
          <div className="admin-products__title">
            <Heading size="medium">
              <FormattedMessage {...messages.title} />
            </Heading>
          </div>
          <div className="admin-products__toolbar">
            <div className="admin-products__toolbar-button">
              <Button type="default" onClick={this.handleUploadClick}>
                <FormattedMessage {...messages.upload} />
              </Button>
            </div>
            <div className="admin-products__toolbar-button">
              <Button type="primary" onClick={this.handleNewProductClick}>
                <FormattedMessage {...messages.new} />
              </Button>
            </div>
          </div>
        </div>

        {loading ?
          <div className="admin-products__spinner">
            <Spinner />
          </div>
          :
          null
        }
        {!loading && products.length > 0 ?
          <div className="admin-products__list">
            <Table headings={headings} rows={rows} />
          </div>
          :
          null
        }
        {!loading && products.length === 0 ?
          <div className="admin-products__no-results">
            <Text size="small">
              <FormattedMessage {...messages.noResults} />
            </Text>
          </div>
          :
          null
        }
      </div>
    );
  }
}


AdminProducts.defaultProps = {
  onAddProduct: () => {},
  findAllProduct: () => {},
  addProduct: {},
  products: [],
  loading: undefined,
};

AdminProducts.propTypes = {
  onAddProduct: PropTypes.func,
  findAllProduct: PropTypes.func,
  addProduct: PropTypes.any,
  products: PropTypes.array,
  loading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  products: selectProductItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProduct: (data) => {
      // console.log(`New product: ${JSON.stringify(data)}`);
      dispatch(addProduct(data));
    },
    findAllProduct: () => {
      dispatch(findAllProduct());
    },
  };
};

// Need update when route is change so don't miss withRouter
const AdminProductsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProducts);

/**
 * Exports
 */
export default AdminProductsWrapper;

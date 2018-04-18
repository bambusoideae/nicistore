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
import { selectProductDetails, selectProductStatus } from '../../../selectors/product';


// Actions
// import { triggerDrawer } from '../actions/drawer';
import { fetchLatestProductVersion, saveProduct, publishProduct } from '../../../actions/product';

// Required components
import Button from '../../../components/common/buttons/Button';
import Checkbox from '../../../components/common/forms/Checkbox';
import CollectionPicker from '../../../components/common/collections/CollectionPicker';
import Heading from '../../../components/common/typography/Heading';
import ImageLibraryManager from '../../../components/containers/images/ImageLibraryManager';
import InlineItems from '../../../components/common/forms/InlineItems';
import InputField from '../../../components/common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../components/common/forms/Select';
import Spinner from '../../../components/common/indicators/Spinner';
import Textarea from '../../../components/common/forms/Textarea';
import ToggleSwitch from '../../../components/common/buttons/ToggleSwitch';

// Translation data for this component
import messages from './AdminProductsEdit.messages';

/**
 * Component
 */
class AdminProductsEdit extends React.Component {
  constructor(props) {
    super(props);

    // props destructure
    const {
      product,
      error,
      loading,
      categories,
      collections,
    } = props;

    // Initial state
    this.state = {
      product,
      error,
      loading,
      categories,
      collections,
      fieldErrors: {}
    };

    //
    this.getImagedescription = this.getImagedescription.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./AdminProductsEdit.scss');

    // Load required data
    // this.context.executeAction(fetchProductAndCheckIfFound, this.props.params.productId);
    // console.log(JSON.stringify(this.props));
    // {"match":{"path":"/admin/products/:productId","url":"/admin/products/5a718fea4722e52dedbd673b","isExact":true,"params":{"productId":"5a718fea4722e52dedbd673b"}},"location":{"pathname":"/admin/products/5a718fea4722e52dedbd673b","search":"","hash":"","key":"pjey2t"},"history":{"length":11,"action":"POP","location":{"pathname":"/admin/products/5a718fea4722e52dedbd673b","search":"","hash":"","key":"pjey2t"}},"loading":false}
    const productId = this.props.match.params.productId;
    this.props.onLoadProduct(productId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      product,
      error,
      loading,
      categories,
      collections,
    } = nextProps;

    // Find field error descriptions in request response
    const fieldErrors = {};
    if (error && error.validation && error.validation.keys) {
      error.validation.keys.forEach((field) => {
        if (field === 'description') {
          fieldErrors['description.en'] = error.validation.details[field];
          fieldErrors['description.pt'] = error.validation.details[field];
        } else {
          fieldErrors[field] = error.validation.details[field];
        }
      });
    }

    this.setState({
      product,
      error,
      loading,
      categories,
      collections,
      fieldErrors
    });
  }

  getImagedescription(image) {
    return image.metadata.description;
  }

  getImageUrl(image) {
    const imageApi = require('../../../api/image');
    const url = imageApi.getImageUrl(image, 'thumbnail');
    return url;
  }

  // View Controllers
  handleEnabledChange = () => {
    const product = this.state.product;
    product.enabled = !(product.enabled === true);
    this.setState({ product });
  };

  handleFieldChange = (field, value) => {
    const product = this.state.product;
    product[field] = value;
    this.setState({ product });
  };

  handleIntlFieldChange = (field, value) => {
    const product = this.state.product;
    if (!product[field]) {
      product[field] = {};
    }
    product[field] = value;
    this.setState({ product });
  };

  handleSectionChange = (tag) => {
    const product = this.state.product;
    if (!product.tags) {
      product.tags = [tag];
    } else if (product.tags.indexOf(tag) === -1) {
      product.tags.push(tag);
    } else {
      product.tags.splice(product.tags.indexOf(tag), 1);
    }
    this.setState({ product });
  };

  handleCollectionPickerChange = (collections) => {
    const product = this.state.product;
    product.collections = collections;
    this.setState({ product });
  };

  handleMainCategoryChange = (collectionId) => {
    const product = this.state.product;
    product.metadata.mainCategory = collectionId;
    this.setState({ product });
  };

  handleMainCollectionChange = (collectionId) => {
    const product = this.state.product;
    product.metadata.mainCollection = collectionId;
    this.setState({ product });
  };

  handleNameChange = (value) => {
    const product = this.state.product;
    product.name = value;
    this.setState({ product });
  };

  handlePricingChange = (param, value) => {
    const product = this.state.product;
    product.pricing[param] = value;
    this.setState({ product });
  };

  handleImageLibraryChange = (images) => {
    const product = this.state.product;
    product.images = images;
    this.setState({ product });
  };

  handleSaveClick = () => {
    // Client-side validations
    const fieldErrors = {};
    if (!this.state.product.name) {
      fieldErrors.name = <FormattedMessage {...messages.fieldRequired} />;
    }

    this.setState({ fieldErrors });

    // Client-side validation checked, trigger update request
    if (Object.keys(fieldErrors).length === 0) {
      const product = this.state.product;
      console.log(`Save: ${JSON.stringify(product)}`);
      this.props.onSaveProduct(product.ref, product);
      // this.context.executeAction(updateProduct, {
      //   id: product.id,
      //   data: {
      //     enabled: product.enabled,
      //     sku: product.sku,
      //     name: product.name,
      //     description: product.description,
      //     images: product.images,
      //     pricing: {
      //       currency: product.pricing.currency,
      //       list: parseFloat(product.pricing.list),
      //       retail: parseFloat(product.pricing.retail),
      //       vat: parseInt(product.pricing.vat)
      //     },
      //     stock: parseInt(product.stock),
      //     tags: product.tags,
      //     collections: product.collections,
      //     metadata: product.metadata
      //   }
      // });
    }
  };

  handlePublishClick = () => {
    this.props.onPublishProduct(this.props.product.ref, this.props.product._id);
  }

  handleUploadImage = (image) => {
    const productApi = require('../../../api/product');
    productApi.uploadProductImage(this.props.product.ref, image).then((img) => {
      const product = this.state.product;
      let images = product.images;
      images = images || [];
      images.push(img);
      product.images = images;

      this.setState({ product });
    });
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params
    // console.log(`State: ${JSON.stringify(this.state)}`);
    if (this.state.product) {
      this.state.product.metadata = {};
      this.state.product.pricing = {};
    }

    // let getCollectionType = (collectionId) => {
    //   let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
    //   if (collection && collection.tags.indexOf('category') !== -1 && collection.tags.indexOf('collection') === -1) {
    //     return 'category';
    //   } else if (collection && collection.tags.indexOf('collection') !== -1 && collection.tags.indexOf('category') === -1) {
    //     return 'collection';
    //   } else {
    //     return null;
    //   }
    // };

    // Stuff that won't work if we are in "404 Not Found", thus, no product object
    let productCategories;
    let productCollections;
    // if (this.state.product) {
    //   productCategories = this.state.product.collections.filter((collectionId) => {
    //     return getCollectionType(collectionId) === 'category';
    //   }).map((collectionId) => {
    //     let category = this.context.getStore(CollectionsStore).getCollection(collectionId);
    //     return {
    //       value: category.id,
    //       name: intlStore.getMessage(category.name)
    //     }
    //   });

    //   productCollections = this.state.product.collections.filter((collectionId) => {
    //     return getCollectionType(collectionId) === 'collection';
    //   }).map((collectionId) => {
    //     let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
    //     return {
    //       value: collection.id,
    //       name: intlStore.getMessage(collection.name)
    //     }
    //   });
    // }

    const fieldError = (field) => this.state.fieldErrors[field];

    //
    // Return
    //
    return (
      <div className="admin-products-edit">
        <div className="admin-products-edit__header">
          <div className="admin-products-edit__title">
            <Heading size="medium">
              <FormattedMessage {...messages.title} />
            </Heading>
          </div>
          {this.state.product ?
            <div className="admin-products-edit__toolbar">
              <div className="admin-products-edit__toolbar-item">
                <Link to="adm-products" params={routeParams}>
                  <Button type="default" disabled={this.state.loading}>
                    <FormattedMessage {...messages.back} />
                  </Button>
                </Link>
              </div>
              <div className="admin-products-edit__toolbar-item">
                <Button type="primary" onClick={this.handleSaveClick} disabled={this.state.loading}>
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
              <div className="admin-products-edit__toolbar-item">
                <Button type="default" onClick={this.handlePublishClick} disabled={this.state.loading}>
                  <FormattedMessage {...messages.publish} />
                </Button>
              </div>
            </div>
            :
            null
          }
        </div>

        {this.state.loading ?
          <div className="admin-products-edit__spinner">
            <Spinner />
          </div>
          :
          null
        }
        {!this.state.loading && !this.state.product ?
          <NotFound />
          :
          null
        }
        {!this.state.loading && this.state.product ?
          <div className="admin-products-edit__form">
            <div className="admin-products-edit__left-column">
              <div className="admin-products-edit__form-item">
                <ToggleSwitch label={<FormattedMessage {...messages.enabled} />}
                  enabled={this.state.product.enabled === true}
                  onChange={this.handleEnabledChange} />
              </div>
              <div className="admin-products-edit__form-item">
                <InlineItems>
                  <InputField label={<FormattedMessage {...messages.sku} />}
                    onChange={() => this.handleFieldChange('sku')}
                    value={this.state.product.sku}
                    error={fieldError('sku')} />
                  <InputField label={<FormattedMessage {...messages.stock} />}
                    onChange={() => this.handleFieldChange('stock')}
                    value={this.state.product.stock}
                    error={fieldError('stock')} />
                  <Select label={<FormattedMessage {...messages.mainCategory} />}
                    placeholder
                    options={productCategories}
                    value={this.state.product.metadata.mainCategory}
                    error={fieldError('mainCategory')}
                    onChange={this.handleMainCategoryChange} />
                  <Select label={<FormattedMessage {...messages.mainCollection} />}
                    placeholder
                    options={productCollections}
                    value={this.state.product.metadata.mainCollection}
                    error={fieldError('mainCategory')}
                    onChange={this.handleMainCollectionChange} />
                </InlineItems>
              </div>
              <div className="admin-products-edit__form-item">
                <InlineItems label={<FormattedMessage {...messages.sections} />}>
                  <Checkbox label={<FormattedMessage {...messages.homepage} />}
                    onChange={() => this.handleSectionChange('homepage')}
                    checked={this.state.product.tags && this.state.product.tags.indexOf('homepage') !== -1} />
                </InlineItems>
              </div>
              <div className="admin-products-edit__form-item">
                <InputField label={<div><FormattedMessage {...messages.name} /></div>}
                  onChange={this.handleNameChange}
                  value={this.state.product.name}
                  error={fieldError('name')} />
              </div>
              {/* <div className="admin-products-edit__form-item">
                <InputField label={<div><FormattedMessage {...messages.name} /> (PT)</div>}
                  onChange={this.handleNameChange.bind(null, 'pt')}
                  value={this.state.product.name.pt}
                  error={fieldError('namePT')} />
              </div> */}
              <div className="admin-products-edit__form-item">
                <Textarea label={<div><FormattedMessage {...messages.description} /></div>}
                  rows="5"
                  onChange={(value) => this.handleIntlFieldChange('description', value)}
                  value={this.state.product.description}
                  error={fieldError('description')} />
              </div>
              {/* <div className="admin-products-edit__form-item">
                <Textarea label={<div><FormattedMessage {...messages.description} /> (PT)</div>}
                  rows="5"
                  onChange={this.handleIntlFieldChange.bind(null, 'description', 'pt')}
                  value={this.state.product.description ? this.state.product.description.pt : null}
                  error={fieldError('description.pt')} />
              </div> */}
              <div className="admin-products-edit__form-item">
                <InlineItems label={<FormattedMessage {...messages.pricing} />}>
                  <InputField label={<FormattedMessage {...messages.currency} />}
                    labelSize="small"
                    labelWeight="normal"
                    value={this.state.product.pricing.currency}
                    onChange={() => this.handlePricingChange('currency')}
                    error={fieldError('pricing.currency')} />
                  <InputField label={<FormattedMessage {...messages.listPrice} />}
                    labelSize="small"
                    labelWeight="normal"
                    value={this.state.product.pricing.list}
                    onChange={() => this.handlePricingChange('list')}
                    error={fieldError('pricing.list')} />
                  <InputField label={<FormattedMessage {...messages.retailPrice} />}
                    labelSize="small"
                    labelWeight="normal"
                    value={this.state.product.pricing.retail}
                    onChange={() => this.handlePricingChange('retail')}
                    error={fieldError('pricing.retail')} />
                  <InputField label={<FormattedMessage {...messages.vat} />}
                    labelSize="small"
                    labelWeight="normal"
                    value={this.state.product.pricing.vat}
                    onChange={() => this.handlePricingChange('vat')}
                    error={fieldError('pricing.vat')} />
                </InlineItems>
              </div>
              <div className="admin-products-edit__form-item">
                <ImageLibraryManager images={this.state.product.images}
                  getImagedescription={this.getImagedescription}
                  getImageUrl={this.getImageUrl}
                  onChange={this.handleImageLibraryChange}
                  onUploadImage={this.handleUploadImage} />
              </div>
            </div>
            <div className="admin-products-edit__right-column">
              <div className="admin-products-edit__form-item">
                <CollectionPicker collections={this.state.categories}
                  checked={this.state.product.collections}
                  onChange={this.handleCollectionPickerChange}>
                  <FormattedMessage {...messages.categories} />
                </CollectionPicker>
              </div>
              <div className="admin-products-edit__form-item">
                <CollectionPicker collections={this.state.collections}
                  checked={this.state.product.collections}
                  onChange={this.handleCollectionPickerChange}>
                  <FormattedMessage {...messages.collections} />
                </CollectionPicker>
              </div>
            </div>
          </div>
          :
          null
        }
      </div>
    );
  }
}

/**
 * Flux
 */
// AdminProductsEdit = connectToStores(AdminProductsEdit, [CollectionsStore, ProductDetailsStore], (context) => {
//   return {
//     _product: context.getStore(ProductDetailsStore).getProduct(),
//     _error: context.getStore(ProductDetailsStore).getError(),
//     _loading: context.getStore(ProductDetailsStore).isLoading(),
//     _categories: context.getStore(CollectionsStore).getCollections(['category']),
//     _collections: context.getStore(CollectionsStore).getCollections(['collection'])
//   };
// });

AdminProductsEdit.defaultProps = {
  onLoadProduct: () => {},
  onSaveProduct: () => {},
  onPublishProduct: () => {},
  match: undefined, // react-router
  localtion: undefined, // react-router
  history: undefined, // react-router
  product: undefined,
  error: undefined,
  loading: undefined,
  categories: undefined,
  collections: undefined,
};

AdminProductsEdit.propTypes = {
  onLoadProduct: PropTypes.func,
  onSaveProduct: PropTypes.func,
  onPublishProduct: PropTypes.func,
  match: PropTypes.any, // react-router
  localtion: PropTypes.any, // react-router
  history: PropTypes.any, // react-router
  product: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  categories: PropTypes.any,
  collections: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  product: selectProductDetails,
  loading: selectProductStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProduct: (productId) => {
      // console.log(`New product: ${JSON.stringify(data)}`);
      dispatch(fetchLatestProductVersion(productId));
    },
    onSaveProduct: (productId, productInfo) => {
      dispatch(saveProduct(productId, productInfo));
    },
    onPublishProduct: (productId, revisionId) => {
      dispatch(publishProduct(productId, revisionId));
    },
  };
};

// Need update when route is change so don't miss withRouter
const AdminProductsEditWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductsEdit);

/**
 * Exports
 */
export default AdminProductsEditWrapper;

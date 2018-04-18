/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';


// Required components
import FormLabel from '../../common/forms/FormLabel';
import ImageLibrary from '../../common/images/ImageLibrary';
import ImageUpload from '../../common/images/ImageUpload';

// Translation data for this component
import messages from './ImageLibraryManager.messages';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageLibraryManager extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      // fileUpload: this.context.getStore(FileUploadStore).getState(),
      fileUpload: {},
      fieldErrors: {},
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ImageLibraryManager.scss');
  }

  componentWillReceiveProps(nextProps) {
    // let fieldErrors = {};
    // if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
    //   nextProps._error.validation.keys.forEach((field) => {
    //     fieldErrors[field] = nextProps._error.validation.details[field];
    //   });
    // }

    // // Check if a file was uploaded
    // if (this.state.fileUpload.loading && !nextProps._fileUpload.loading && !nextProps._fileUpload.error) {
    //   let images = this.props.images;
    //   images.push(nextProps._fileUpload.file);
    //   this.props.onChange(images);
    // }

    // this.setState({
    //   fileUpload: nextProps._fileUpload,
    //   fieldErrors: fieldErrors
    // });
  }

  // View Controllers
  handleImageSubmit = (file) => {
    // this.context.executeAction(uploadFile, {
    //   resource: 'products',
    //   file: file
    // });
  };

  // Template
  render() {
    return (
      <div className="image-library-manager">
        <FormLabel>
          <FormattedMessage {...messages.gallery} />
        </FormLabel>
        <div className="image-library-manager__gallery">
          <div className="image-library-manager__upload">
            <ImageUpload onSubmit={this.props.onUploadImage}
              disabled={this.state.fileUpload.loading} />
          </div>
          <div className="image-library-manager__images">
            <ImageLibrary images={this.props.images}
              getImagedescription={this.props.getImagedescription}
              getImageUrl={this.props.getImageUrl}
              onChange={this.props.onChange} />
          </div>
        </div>
      </div>
    );
  }
}

ImageLibraryManager.defaultProps = {
  onChange: (images) => debug('onChange not defined.', images),
  onUploadImage: (image) => debug('onUploadImage not defined.', image),
  getImagedescription: undefined,
  getImageUrl: undefined,
  images: undefined,
};

ImageLibraryManager.propTypes = {
  onChange: PropTypes.func,
  onUploadImage: PropTypes.func,
  getImagedescription: PropTypes.func,
  getImageUrl: PropTypes.func,
  images: PropTypes.any,
};

/**
 * Exports
 */
export default ImageLibraryManager;

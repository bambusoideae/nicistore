/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


// Required components
import Button from '../buttons/Button';

// Translation data for this component
import messages from './ImageLibrary.messages';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageLibrary extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ImageLibrary.scss');
  }

  // View Controllers
  handleViewURLClick = (idx) => {
    alert(this.props.getImageUrl(this.props.images[idx]));
  };

  handleRemoveClick = (idx) => {
    const images = this.props.images;
    images.splice(idx, 1);
    this.props.onChange(images);
  };

  // Template
  render() {
    const { images } = this.props;
    if (!images) {
      return (
        <div className="image-library">
          No images
        </div>
      );
    }

    return (
      <div className="image-library">
        {images.map((img, idx) => {
          const { getImagedescription, getImageUrl } = this.props;
          const description = getImagedescription(img);
          const url = getImageUrl(img);

          return (
            <div key={img.url} className="image-library__placeholder">
              <img src={url} alt={description} />
              <div className="image-library__placeholder-overlay">
                <div className="image-library__placeholder-overlay-content">
                  <div className="image-library__button">
                    <Button type="default" onClick={() => this.handleViewURLClick(idx)}>
                      <FormattedMessage {...messages.viewURL} />
                    </Button>
                  </div>
                  <div className="image-library__button">
                    <Button type="primary" onClick={() => this.handleRemoveClick(idx)}>
                      <FormattedMessage {...messages.delete} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ImageLibrary.defaultProps = {
  onChange: (images) => debug('onChange not defined.', images),
  getImagedescription: (image) => image.description,
  getImageUrl: (image) => `//${image.url}`,
  images: [],
};

ImageLibrary.propTypes = {
  onChange: PropTypes.func,
  getImagedescription: PropTypes.func,
  getImageUrl: PropTypes.func,
  images: PropTypes.array,
};

/**
 * Exports
 */
export default ImageLibrary;

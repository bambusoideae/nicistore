/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component
 */
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      selectedImage: 0, // Default to first image of the array
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ImageGallery.scss');
  }

  // View Controllers
  handleImageClick = (idx) => {
    this.setState({ selectedImage: idx });
  };

  // Template
  render() {
    /* eslint-disable react/no-array-index-key */
    return (
      <div className="image-gallery">
        <div className="image-gallery__current">
          {this.props.images.length > 0 ?
            <img src={this.props.getImageUrl(this.props.images[this.state.selectedImage])}
              alt={this.props.getImagedescription(this.props.images[this.state.selectedImage])} />
            :
            <div>No Image</div>
          }
        </div>
        {this.props.images.length > 1 ?
          <div className="image-gallery__thumbnails">
            {this.props.images.map((img, idx) => {
              let imageClass = 'image-gallery__image';
              if (idx === this.state.selectedImage) {
                imageClass += ' image-gallery__image--selected';
              }
              return (
                <div key={idx} className={imageClass} onClick={() => this.handleImageClick(idx)} role="presentation">
                  <img src={this.props.getImageUrl(img)} alt={this.props.getImagedescription(img)} />
                </div>
              );
            })}
          </div>
          :
          null
        }
      </div>
    );
    /* eslint-enable */
  }
}

ImageGallery.defaultProps = {
  getImagedescription: (image) => image.description,
  getImageUrl: (image) => `//${image.url}`,
  images: [],
};

ImageGallery.propTypes = {
  getImagedescription: PropTypes.func,
  getImageUrl: PropTypes.func,  
  images: PropTypes.array,
};

/**
 * Exports
 */
export default ImageGallery;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Dropzone components
// import Dropzone from 'react-dropzone';

// Required components
import Button from '../buttons/Button';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      file: undefined,
      image: require('./image_placeholder.png') // Load static content
    };
  }
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ImageUpload.scss');
  }

  // View Controllers
  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  handlePlaceholderClick = () => {
    this.inputRef.click();
  };

  handleFileChange = (evt) => {
    const file = evt.target.files[0];
    const fileType = /image.*/; // Image files
    if (file.type.match(fileType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = reader.result;
        this.setState({ image: img.src });
      };
      reader.readAsDataURL(file);
      this.setState({ file });
    }
  };

  handleSubmitClick = () => {
    this.props.onSubmit(this.state.file);
  };

  // https://reactjs.org/docs/refs-and-the-dom.html
  // Template
  render() {
    return (
      <div className="image-upload">
        <input ref={this.setInputRef} type="file" className="image-upload__input" onChange={this.handleFileChange} />
        <div className="image-upload__placeholder" onClick={this.handlePlaceholderClick} role="presentation">
          <img src={this.state.image} alt={this.state.image} />
        </div>
        <div className="image-upload__actions">
          <Button type="primary" disabled={this.props.disabled === true || !this.state.file} onClick={this.handleSubmitClick}>
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  onSubmit: (file) => debug('onSubmit not defined.', file),
  disabled: undefined,
};

ImageUpload.propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.any,
};

/**
 * Exports
 */
export default ImageUpload;

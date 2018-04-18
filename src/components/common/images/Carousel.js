/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component
 */
class Carousel extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Carousel.scss');
  }

  // Template
  render() {
    return (
      <div className="carousel">
        <div className={`gallery autoplay items-${this.props.images.length}`}>
          {this.props.images.map((img, idx) => {
            const itemId = `item-${idx + 1}`;
            return (
              <div key={img.src} id={itemId} className="control-operator" />
            );
          })}
          {this.props.images.map((img) => {
            return (
              <figure key={img.src} className="item">
                {img.link ?
                  <a href={img.link}><img src={img.src} alt={img.src} /></a>
                  :
                  <img src={img.src} alt={img.src} />
                }
              </figure>
            );
          })}
          <div className="controls">
            {this.props.images.map((img, idx) => {
              const itemHref = `#item-${idx + 1}`;
              return (
                <a key={img.src} href={itemHref} className="control-button">•</a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = {
  images: [],
};

Carousel.propTypes = {
  images: PropTypes.array,
};

/**
 * Exports
 */
export default Carousel;

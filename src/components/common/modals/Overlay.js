/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component
 */
class Overlay extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Overlay.scss');
  }

  // Template
  render() {
    return (
      <div className="overlay"
        role="presentation"
        onClick={this.props.onClick}>
        <div className="overlay__container">
          <div className="overlay__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Overlay.defaultProps = {
  onClick: () => {},
  children: undefined,
};

Overlay.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default Overlay;

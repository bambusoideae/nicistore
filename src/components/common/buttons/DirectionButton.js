/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


// Instantiate debugger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class DirectionButton extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./DirectionButton.scss');
  }

  // Template
  render() {
    return (
      <div className="direction-button">
        <span className="direction-button__move-button" onClick={this.props.handleMoveLeftClick} role="button" tabIndex="0">
          &#10094;
        </span>
        <span>{this.props.item.name}</span>
        <span className="direction-button__move-button" onClick={this.props.handleMoveRightClick} role="button" tabIndex="0">
          &#10095;
        </span>
      </div>
    );
  }
}

DirectionButton.defaultProps = {
  handleMoveLeftClick: () => debug('handleMoveLeftClick not defined'),
  handleMoveRightClick: () => debug('handleMoveRightClick not defined'),
  item: undefined,
};

DirectionButton.propTypes = {
  handleMoveLeftClick: PropTypes.func,
  handleMoveRightClick: PropTypes.func,
  item: PropTypes.any,
};


/**
 * Exports
 */
export default DirectionButton;

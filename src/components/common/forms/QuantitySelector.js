/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);

    // Initial state

    // This binding is necessary to make `this` work in the callback
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./QuantitySelector.scss');
  }

  // View Controllers
  handleMinusClick() {
    let { value } = this.props;
    if (value > 0) {
      value -= 1;
    }
    this.props.onChange(value);
  }

  handlePlusClick() {
    let { value } = this.props;
    this.props.onChange(++value);
  }

  // Template
  render() {
    const { handlePlusClick, handleMinusClick } = this;
    const { value } = this.props;

    return (
      <div className="quantity-selector">
        <div className="minus" onClick={handleMinusClick} role="button" tabIndex="0">-</div>
        <div className="value">{value}</div>
        <div className="plus" onClick={handlePlusClick} role="button" tabIndex="0">+</div>
      </div>
    );
  }
}


QuantitySelector.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  value: 0,
};

QuantitySelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};

/**
 * Exports
 */
export default QuantitySelector;

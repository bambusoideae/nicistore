/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class Button extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Button.scss');
  }

  // View Controllers
  handleClick = () => {
    if (this.props.disabled !== true && this.props.loading !== true) {
      this.props.onClick();
    }
  };

  // Template
  render() {
    let buttonClass = 'button';
    if (['default', 'primary'].indexOf(this.props.type) !== -1) {
      buttonClass += ` button-${this.props.type}`;
    } else {
      buttonClass += ' button-default';
    }

    if (this.props.disabled === true) {
      buttonClass += ' button--disabled';
    }

    if (this.props.loading === true) {
      buttonClass += ' button--disabled';
    }

    if (['small', 'medium', 'large'].indexOf(this.props.fontSize) !== -1) {
      buttonClass += ` button-font-${this.props.fontSize}`;
    } else {
      buttonClass += ' button-font-medium';
    }

    if (this.props.className) {
      buttonClass += ` ${this.props.className}`;
    }

    return (
      <button className={buttonClass} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: () => debug('onClick not defined'),
  children: undefined,
  className: undefined,
  disabled: undefined,
  type: 'default',
  fontSize: 'medium',
  loading: undefined,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.any,
  disabled: PropTypes.any,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  loading: PropTypes.any,
};

/**
 * Exports
 */
export default Button;

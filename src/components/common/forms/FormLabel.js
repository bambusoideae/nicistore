/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class FormLabel extends React.Component {
  // Template
  render() {
    let size = 'medium'; // Default label size
    if (['small', 'large'].indexOf(this.props.size) !== -1) {
      size = this.props.size;
    }

    let weight = 'bold'; // Default label weight
    if (this.props.weight === 'normal') {
      weight = this.props.weight;
    }

    return (
      <label className="form-label" htmlFor={this.props.for}>
        <Text size={size} weight={weight}>{this.props.children}</Text>
      </label>
    );
  }
}

FormLabel.defaultProps = {
  size: 'medium',
  weight: 'bold',
  for: undefined,
  children: undefined,
};

FormLabel.propTypes = {
  size: PropTypes.string,
  weight: PropTypes.string,
  for: PropTypes.string,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default FormLabel;

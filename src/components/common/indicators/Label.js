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
class Label extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Label.scss');
  }

  render() {
    let labelClass = 'label';
    if (['primary', 'info', 'success', 'warning', 'error', 'dark'].indexOf(this.props.type) !== -1) {
      labelClass += ` label-${this.props.type}`;
    }

    let textSize = 'small';
    if (['medium', 'large'].indexOf(this.props.size) !== -1) {
      textSize = this.props.size;
    }

    let textWeight = 'normal';
    if (this.props.weight === 'bold') {
      textWeight = 'bold';
    }

    return (
      <div className={labelClass}>
        <Text size={textSize} weight={textWeight}>
          {this.props.children}
        </Text>
      </div>
    );
  }
}

Label.defaultProps = {
  size: 'small',
  weight: 'normal',
  children: undefined,
  type: undefined,
};

Label.propTypes = {
  size: PropTypes.string,
  weight: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
};

/**
 * Exports
 */
export default Label;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import FormLabel from './FormLabel';

/**
 * Component
 */
class InlineItems extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./InlineItems.scss');
  }

  // Template
  render() {
    return (
      <div className="inline-items">
        <div className="inline-items__label">
          <FormLabel>{this.props.label}</FormLabel>
        </div>
        <div className="inline-items__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

InlineItems.defaultProps = {
  label: undefined,
  children: undefined,
};

InlineItems.propTypes = {
  label: PropTypes.any,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default InlineItems;

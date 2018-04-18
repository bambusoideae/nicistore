/**
 * Imports
 */
import React from 'react';

import PropTypes from 'prop-types';

/**
 * Component
 */
class Badge extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Badge.scss');
  }

  render() {
    return (
      <div className="badge" data-badge={this.props.value}>
        {this.props.children}
      </div>
    );
  }
}

Badge.defaultProps = {
  value: undefined,
  children: undefined,
};

Badge.propTypes = {
  value: PropTypes.any,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default Badge;

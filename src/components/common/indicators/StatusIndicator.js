/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component
 */
class StatusIndicator extends React.Component {
  componentDidMount() {
    // Component styles
    require('./StatusIndicator.scss');
  }

  render() {
    let statusClass = 'status-indicator';
    if (['primary', 'info', 'success', 'warning', 'error', 'dark'].indexOf(this.props.status) !== -1) {
      statusClass += ` status-indicator-${this.props.status}`;
    } else {
      statusClass += ' status-indicator-default';
    }
    return (
      <div className={statusClass} />
    );
  }
}

StatusIndicator.defaultProps = {
  status: 'default',
};

StatusIndicator.propTypes = {
  status: PropTypes.string,
};

/**
 * Exports
 */
export default StatusIndicator;

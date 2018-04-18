/**
 * Imports
 */
import React from 'react';

import PropTypes from 'prop-types';

/**
 * Component
 */
class Drawer extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Drawer.scss');
  }

  render() {
    let drawerClass = 'drawer';

    if (this.props.position === 'left') {
      drawerClass += ' drawer-left';
    } else if (this.props.position === 'right') {
      drawerClass += ' drawer-right';
    }

    if (this.props.open && drawerClass.split(' ').length === 2) {
      drawerClass += ` ${drawerClass.split(' ')[1]}-open`;
    }

    return (
      <div className={drawerClass}>{this.props.children}</div>
    );
  }
}

Drawer.defaultProps = {
  children: undefined,
  position: undefined,
  open: false,
};

Drawer.propTypes = {
  children: PropTypes.any,
  position: PropTypes.string,
  open: PropTypes.bool,
};

/**
 * Exports
 */
export default Drawer;

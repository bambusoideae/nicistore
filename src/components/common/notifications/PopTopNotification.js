/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class PopTopNotification extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      closeImg: require('./close.png'),
      opened: true
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./PopTopNotification.scss');
  }

  // View Controllers
  handleDismissClick = () => {
    this.setState({ opened: false });
    // Wait for animation to finish
    setTimeout(() => {
      this.props.onDismissClick();
    }, 300);
  };

  // Template
  render() {
    let notificationClass = 'pop-top-notification';
    if (!this.state.opened) {
      notificationClass += ' pop-top-notification--closed';
    }
    if (['success', 'warning', 'error'].indexOf(this.props.type) !== -1) {
      notificationClass += ` pop-top-notification-${this.props.type}`;
    } else {
      notificationClass += ' pop-top-notification-success';
    }

    return (
      <div className={notificationClass}>
        <div className="pop-top-notification__content">
          <Text className="pop-top-notification__text" size="medium" weight="bold">
            {this.props.children}
          </Text>
        </div>
        <div className="pop-top-notification__close" onClick={this.handleDismissClick} role="presentation">
          <img src={this.state.closeImg} alt="close" />
        </div>
      </div>
    );
  }
}


PopTopNotification.defaultProps = {
  onDismissClick: () => debug('onDismissClick not defined'),
  type: 'success',
  children: undefined,
};

PopTopNotification.propTypes = {
  onDismissClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default PopTopNotification;

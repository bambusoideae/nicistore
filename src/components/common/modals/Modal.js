/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


// Required components
import Heading from '../typography/Heading';

/**
 * Component
 */
class Modal extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Modal.scss');
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__container">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__title">
                <Heading size="medium">{this.props.title}</Heading>
              </div>
              <div className="modal__close">
                {this.props.onCloseClick ?
                  <button className="modal__close-button" onClick={this.props.onCloseClick}>&times;</button>
                  :
                  null
                }
              </div>
            </div>
            <div className="modal__body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  onCloseClick: () => {},
  children: undefined,
  title: undefined,
};

Modal.propTypes = {
  onCloseClick: PropTypes.func,
  children: PropTypes.any,
  title: PropTypes.any,
};

/**
 * Exports
 */
export default Modal;

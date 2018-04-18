/**
 * Imports
 */
import React from 'react';

// import PropTypes from 'prop-types';

// Required components
import Spinner from './Spinner';

/**
 * Component
 */
class OverlayLoader extends React.Component {
  componentDidMount() {
    // Component styles
    require('./OverlayLoader.scss');
  }

  render() {
    return (
      <div className="overlay-loader">
        <div className="overlay-loader__container">
          <div className="overlay-loader__content">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
}

// OverlayLoader.defaultProps = {
//   size: 'small',
//   weight: 'normal',
//   children: undefined,
// };

// OverlayLoader.propTypes = {
//   size: PropTypes.string,
//   weight: PropTypes.string,
//   children: PropTypes.any,
// };

/**
 * Exports
 */
export default OverlayLoader;

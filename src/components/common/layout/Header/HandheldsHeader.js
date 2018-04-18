/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectCartTotalItems } from '../../../../selectors/cart';
import { selectOpenedDrawer } from '../../../../selectors/drawer';

/** Actions */
import { triggerDrawer } from '../../../../actions/drawer';


// Required components
import Badge from '../../indicators/Badge';

/**
 * Component
 */
class HandheldsHeader extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.toggleCartDrawer = this.toggleCartDrawer.bind(this);
    this.toggleMenuDrawer = this.toggleMenuDrawer.bind(this);
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./HandheldsHeader.scss');
  }

  toggleCartDrawer() {
    this.props.handleBtnClick('cart');
  }

  toggleMenuDrawer() {
    this.props.handleBtnClick('menu');
  }

  // Template
  render() {
    // Helper variables
    const routeParams = {};
    const { handleBtnClick, cartTotalItems, openedDrawer } = this.props;
    const { toggleCartDrawer, toggleMenuDrawer } = this;

    // Return
    return (
      <div className="handhelds-header">
        <div className="handhelds-header__left-actions">
          {openedDrawer !== 'menu' ?
            <div className="handhelds-header__menu-button" onClick={toggleMenuDrawer} role="button" tabIndex="0" />
            :
            <div className="handhelds-header__close-button" onClick={toggleMenuDrawer} role="button" tabIndex="0" />
          }
        </div>
        <div className="handhelds-header__title">
          <Link to="/" params={routeParams}>
            <div className="handhelds-header__logo" />
          </Link>
        </div>
        <div className="handhelds-header__right-actions">
          {openedDrawer !== 'cart' ?
            <Badge value={cartTotalItems > 0 ? cartTotalItems : null}>
              <div className="handhelds-header__cart-button" onClick={toggleCartDrawer} role="button" tabIndex="0" />
            </Badge>
            :
            <div className="handhelds-header__close-button" onClick={toggleCartDrawer} role="button" tabIndex="0" />
          }
        </div>
      </div>
    );
  }
}

HandheldsHeader.defaultProps = {
  handleBtnClick: () => {},
  cartTotalItems: undefined,
  openedDrawer: undefined,
};

HandheldsHeader.propTypes = {
  handleBtnClick: PropTypes.func,
  cartTotalItems: PropTypes.any,
  openedDrawer: PropTypes.any,
};

/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
  cartTotalItems: selectCartTotalItems,
  openedDrawer: selectOpenedDrawer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleBtnClick: (drawer) => {
      dispatch(triggerDrawer(drawer));
    }
  };
};

const HandheldsHeaderWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HandheldsHeader);

/**
 * Exports
 */
export default HandheldsHeaderWrapper;

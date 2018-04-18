/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// Selectors
import { selectCartTotalItems } from '../../../../selectors/cart';
import { selectAccountInformation, selectAuthenticateState } from '../../../../selectors/account';
import { selectOpenedDrawer } from '../../../../selectors/drawer';

// Actions
import { triggerDrawer } from '../../../../actions/drawer';


// Required components
import Badge from '../../indicators/Badge';
import CollectionTreeMenu from '../../navigation/CollectionTreeMenu';
import MainNavigation from '../../navigation/MainNavigation';
import Text from '../../typography/Text';

// Translation data for this component
import messages from './DesktopHeader.messages';

/**
 * Component
 */
class DesktopHeader extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./DesktopHeader.scss');
  }

  // Template
  render() {
    // Helper variables
    const routeParams = {};
    const { handleBtnClick, user, cartTotalItems, isAuthenticated } = this.props;
    const collectionsTreeMenuEnabled = false;

    // Return
    return (
      <div className="desktop-header">
        <div className="desktop-header__container">
          <div className="desktop-header__row">
            <div className="desktop-header__container-left-column">
              <Link className="desktop-header__logo-link" to="/" params={routeParams}>
                <div className="desktop-header__logo" />
              </Link>
              <div className="desktop-header__navigation">
                <MainNavigation links={this.props.collections} />
              </div>
            </div>
            <div className="desktop-header__container-right-column">
              {isAuthenticated ?
                <div className="desktop-header__account">
                  <div className="desktop-header__logout-button">
                    <Link to="/logout" params={routeParams}>
                      <Text size="small">
                        <FormattedMessage {...messages.logout} />
                      </Text>
                    </Link>
                  </div>
                  <div className="desktop-header__account-button">
                    <Link to="account" params={routeParams}>
                      <div>
                        <Text size="small">
                          <FormattedMessage {...messages.hi} />, {user ? user.name.split(' ')[0] : 'null'}
                        </Text>
                      </div>
                      <div>
                        <Text size="small" weight="bold">
                          <FormattedMessage {...messages.myAccount} />
                        </Text>
                      </div>
                    </Link>
                  </div>
                </div>
                :
                <div className="desktop-header__account">
                  <div className="desktop-header__register-button">
                    <Link to="register" params={routeParams}>
                      <Text size="medium">
                        <FormattedMessage {...messages.register} />
                      </Text>
                    </Link>
                  </div>
                  <div className="desktop-header__login-button">
                    <Link to="/login" params={routeParams}>
                      <Text size="medium">
                        <FormattedMessage {...messages.login} />
                      </Text>
                    </Link>
                  </div>
                </div>
              }
              <div className="desktop-header__cart" onClick={() => { handleBtnClick('cart'); }} role="button" tabIndex="0" >
                <Badge value={cartTotalItems > 0 ? cartTotalItems : null} />
              </div>
            </div>
          </div>
          {collectionsTreeMenuEnabled && this.props.collectionsTree ?
            <div className="desktop-header__row">
              <CollectionTreeMenu collections={this.props.collectionsTree} />
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

DesktopHeader.defaultProps = {
  handleBtnClick: () => {},
  cartTotalItems: undefined,
  openedDrawer: undefined,
  collections: undefined,
  collectionsTree: undefined,
  user: undefined,
  isAuthenticated: undefined,
};

DesktopHeader.propTypes = {
  handleBtnClick: PropTypes.func,
  cartTotalItems: PropTypes.any,
  openedDrawer: PropTypes.any,
  collections: PropTypes.any,
  collectionsTree: PropTypes.any,
  user: PropTypes.any,
  isAuthenticated: PropTypes.bool,
};


/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
  cartTotalItems: selectCartTotalItems,
  user: selectAccountInformation,
  openedDrawer: selectOpenedDrawer,
  isAuthenticated: selectAuthenticateState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleBtnClick: (drawer) => {
      dispatch(triggerDrawer(drawer));
    }
  };
};

const DesktopHeaderWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopHeader);

/**
 * Exports
 */
export default DesktopHeaderWrapper;

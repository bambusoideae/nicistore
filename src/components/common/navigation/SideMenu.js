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
import { selectAccountInformation, selectAuthenticateState } from '../../../selectors/account';

// Actions
import { triggerDrawer } from '../../../actions/drawer';

// Required Components
import Text from '../typography/Text';

// Translation data for this component
import messages from './SideMenu.messages';

/**
 * Component
 */
class SideMenu extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./SideMenu.scss');
  }

  // Template
  render() {
    const routeParams = {};
    const { handleItemClick } = this.props;
    const { user, isAuthenticated } = this.props;

    return (
      <div className="side-menu">
        <nav>
          <ul className="side-menu__homepage">
            <li className="side-menu__item side-menu__collection-item" onClick={handleItemClick} role="menuitem">
              <Link to="homepage" params={routeParams}>
                <Text size="small">
                  <FormattedMessage {...messages.homepage} />
                </Text>
              </Link>
            </li>
          </ul>
          <ul className="side-menu__collections">
            {this.props.collections && this.props.collections.map((obj) => {
              return (
                <li className="side-menu__item side-menu__collection-item" onClick={handleItemClick} role="menuitem">
                  <Link to={obj.to} params={Object.assign(obj.params || {}, routeParams)}>
                    <Text size="medium">{obj.name}</Text>
                  </Link>
                </li>
              );
            })}
          </ul>
          {isAuthenticated ?
            <ul className="side-menu__account">
              <li className="side-menu__item side-menu__account-item" onClick={handleItemClick} role="menuitem">
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
              </li>
              <li className="side-menu__item side-menu__account-item" onClick={handleItemClick} role="menuitem">
                <Link to="logout" params={routeParams}>
                  <Text size="small" weight="bold">
                    <FormattedMessage {...messages.logout} />
                  </Text>
                </Link>
              </li>
            </ul>
            :
            <ul className="side-menu__account">
              <li className="side-menu__item side-menu__account-item" onClick={handleItemClick} role="menuitem">
                <Link to="login" params={routeParams}>
                  <Text size="small" weight="bold">
                    <FormattedMessage {...messages.login} />
                  </Text>
                </Link>
              </li>
              <li className="side-menu__item side-menu__account-item" onClick={handleItemClick} role="menuitem">
                <Link to="register" params={routeParams}>
                  <Text size="small" weight="bold">
                    <FormattedMessage {...messages.register} />
                  </Text>
                </Link>
              </li>
            </ul>
          }
        </nav>
      </div>
    );
  }
}

SideMenu.defaultProps = {
  handleItemClick: () => {},
  collections: [],
  user: undefined,
  isAuthenticated: undefined,
};

SideMenu.propTypes = {
  handleItemClick: PropTypes.func,
  collections: PropTypes.array,
  user: PropTypes.any,
  isAuthenticated: PropTypes.bool,
};


/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
  user: selectAccountInformation,
  isAuthenticated: selectAuthenticateState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleItemClick: () => {
      dispatch(triggerDrawer(null)); // Close drawer
    }
  };
};

const SideMenuWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

/**
 * Exports
 */
export default SideMenuWrapper;

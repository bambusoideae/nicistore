/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import { Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';

import { createStructuredSelector } from 'reselect';

// Selectors
// import { selectOpenedDrawer } from '../selectors/drawer';
import { selectAuthenticateState } from '../../selectors/account';

// Actions
// import { triggerDrawer } from '../actions/drawer';
import { signOut } from '../../actions/account';

// Required components
import Spinner from '../../components/common/indicators/Spinner';
import Text from '../../components/common/typography/Text';

// Translation data for this component
import messages from './Logout.messages';

/**
 * Component
 */
class Logout extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Logout.scss');
  }

  // Template
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.props.signOut();

      return (
        <div className="logout">
          <div className="logout__container">
            <div className="logout__header">
              <Text size="medium">
                <FormattedMessage {...messages.header} />
              </Text>
            </div>
            <div className="logout__spinner">
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

    return <Redirect to="/" />;
  }
}

Logout.defaultProps = {
  signOut: () => {},
  isAuthenticated: undefined,
};

Logout.propTypes = {
  signOut: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectAuthenticateState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    redirect: (route) => {
      dispatch(push(route));
    }
  };
};

// Need update when route is change so don't miss withRouter
const LogoutWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

/**
 * Logout
 */
export default LogoutWrapper;

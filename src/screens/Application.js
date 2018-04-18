import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Router, Route, Switch, Link, withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { Helmet } from 'react-helmet';

// Selectors
import { selectOpenedDrawer } from '../selectors/drawer';


// Actions
import { triggerDrawer } from '../actions/drawer';

import Admin from './Admin/Admin';
import HomePage from './HomePage/HomePage';
import Login from './Account/Login';
import Logout from './Account/Logout';
import ProductPage from './Products/ProductPage';
import Register from './Account/Register';

// Required components
import Drawer from '../components/common/layout/Drawer/Drawer';
import Footer from '../components/common/layout/Footer';
import Header from '../components/common/layout/Header';
import Heading from '../components/common/typography/Heading';
import OverlayLoader from '../components/common/indicators/OverlayLoader';
import SideCart from '../components/common/cart/SideCart';
import SideMenu from '../components/common/navigation/SideMenu';

import { slugify } from '../utils/strings';

// import PopTopNotification from '../components/common/notifications/PopTopNotification';

// import logo from '../assets/logo.svg';


const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <div>Page not found.</div>
    </div>
  );
};

export class Application extends Component {
  componentDidMount() {
    // Load styles
    require('./Application.scss');
  }

  render() {
    const { handleOverlayClick, handleNotificationDismissClick } = this.props;
    const { navCollections, collectionsTree, notification, openedDrawer, pageLoading } = this.props;


    // Main navigation menu items
    const collections = navCollections.map((collection) => {
      return {
        name: collection.name,
        to: 'collection-slug',
        params: {
          collectionId: collection.id,
          collectionSlug: slugify(collection.name)
        }
      };
    });

    // Compute CSS classes for the overlay
    let overlayClass = 'application__overlay';
    if (openedDrawer === 'menu') {
      overlayClass += ' application__overlay--left-drawer-open';
    } else if (openedDrawer === 'cart') {
      overlayClass += ' application__overlay--right-drawer-open';
    }

    // Compute CSS classes for the content
    let contentClass = 'application__container';
    if (openedDrawer === 'menu') {
      contentClass += ' application__container--left-drawer-open';
    } else if (openedDrawer === 'cart') {
      contentClass += ' application__container--right-drawer-open';
    }

    // Check if user logged-in is an Admin
    // let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);
    const isAdmin = false; // TODO: Write a selector or helper check someone is admin or not


    return (
      <div className="application">
        {pageLoading ?
          <OverlayLoader />
          :
          null
        }
        {/* {notification ?
          <PopTopNotification key={this.context.getStore(ApplicationStore).uniqueId()}
                              type={notification.type}
                              onDismissClick={handleNotificationDismissClick}>
              {notification.message}
          </PopTopNotification>
          :
          null
        } */}
        <Drawer position="left" open={openedDrawer === 'menu'}>
          <SideMenu collections={collections} />
        </Drawer>
        {/* TODO: Enable Cart */}
        <Drawer position="right" open={openedDrawer === 'cart'}>
          <SideCart />
        </Drawer>
        <div className={overlayClass} onClick={handleOverlayClick} role="presentation">
          <div className="application__overlay-content" />
        </div>
        <div className={contentClass}>
          {isAdmin ?
            <div className="application__admin-warning">
              <Heading>*** ADMIN ACCOUNT ***</Heading>
            </div>
            :
            null
          }
          <Header collections={collections} collectionsTree={collectionsTree} />
          <div className="application__container-wrapper">
            <div className="application__container-content">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/products/:productId" component={ProductPage} />
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Application.defaultProps = {
  handleOverlayClick: () => {},
  handleNotificationDismissClick: () => {},
  navCollections: [],
  collectionsTree: undefined,
  notification: undefined,
  openedDrawer: undefined,
  pageLoading: undefined,
};

Application.propTypes = {
  handleOverlayClick: PropTypes.func,
  handleNotificationDismissClick: PropTypes.func,
  navCollections: PropTypes.any,
  collectionsTree: PropTypes.any,
  notification: PropTypes.any,
  openedDrawer: PropTypes.any,
  pageLoading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  openedDrawer: selectOpenedDrawer
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleNotificationDismissClick: () => {
      // popNotification
      console.log('Implement pop notification action!');
    },
    handleOverlayClick: () => {
      dispatch(triggerDrawer(null));
    }
  };
};

// Need update when route is change so don't miss withRouter
const ApplicationWrapper = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Application));

export default ApplicationWrapper;

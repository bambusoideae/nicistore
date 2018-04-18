/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Route, Switch, withRouter } from 'react-router-dom';

// Required components
// import AuthenticatedComponent from '../../components/core/AuthenticatedComponent';
import Heading from '../../components/common/typography/Heading';
import MainNavigation from '../../components/common/navigation/MainNavigation';

// Component in route
import AdminProducts from './Products/AdminProducts';
import AdminProductsEdit from './Products/AdminProductsEdit';

// Translation data for this component
import messages from './Admin.messages';

/**
 * Component
 */
class Admin extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Load styles
    require('./Admin.scss');

    // Request Collections refresh because, if we're here, then we want
    // to see all the collections in Product page (for example) and not only
    // the ones enabled which are the ones with which the app is loaded on the
    // server-side
    // this.context.executeAction(fetchAllCollections);
  }

  // Template
  render() {
    // Links
    const links = [
      { name: <FormattedMessage {...messages.dashboard} />, to: '/admin/dashboard' },
      { name: <FormattedMessage {...messages.orders} />, to: '/admin/orders' },
      { name: <FormattedMessage {...messages.customers} />, to: '/admin/customers' },
      { name: <FormattedMessage {...messages.collections} />, to: '/admin/collections' },
      { name: <FormattedMessage {...messages.products} />, to: '/admin/products' },
      { name: <FormattedMessage {...messages.contents} />, to: '/admin/contents' }
    ];

    // Return
    return (
      <div className="admin">
        <div className="admin-header">
          <div className="admin-title">
            <Heading size="large">Admin</Heading>
          </div>
          <div className="admin-nav">
            <MainNavigation links={links} />
          </div>
        </div>
        <div className="admin-container">
          <Switch>
            {/* <Route exact path="/admin" component={AdminDashboard} /> */}
            <Route exact path="/admin/products" component={AdminProducts} />
            <Route path="/admin/products/:productId" component={AdminProductsEdit} />
          </Switch>
        </div>
      </div>
    );
  }
}

/**
 * This component requires Authentication
 */
const AdminWrapper = withRouter(Admin);

/**
 * Exports
 */
export default AdminWrapper;

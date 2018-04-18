/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


/**
 * Component
 */
class MainNavigation extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./MainNavigation.scss');
  }

  // Template
  render() {
    // Base route params
    const routeParams = {};

    // Return
    return (
      <div className="main-navigation">
        <nav>
          <ul>
            {this.props.links.map((link) => {
              return (
                <li className="main-navigation__item">
                  <Link to={link.to} params={Object.assign(link.params || {}, routeParams)}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

MainNavigation.defaultProps = {
  links: [],
};

MainNavigation.propTypes = {
  links: PropTypes.array,
};


/**
 * Exports
 */
export default MainNavigation;

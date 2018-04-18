/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { slugify } from '../../../utils/strings';


// Required components
import Text from '../typography/Text';

import TreeMenu from './TreeMenu';

/**
 * Component
 */
class CollectionTreeMenu extends React.Component {
  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      openedDrawer: undefined
    };

    // This binding is necessary to make `this` work in the callback
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./CollectionTreeMenu.scss');
  }

  // View Controllers
  handleMouseEnter(collection) {
    this.setState({ openedDrawer: collection });
  }

  handleMouseLeave() {
    this.setState({ openedDrawer: null });
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params

    //
    // Return
    //
    return (
      <div className="collection-tree-menu">
        <nav className="collection-tree-menu__nav" onMouseLeave={this.handleMouseLeave}>
          <ul>
            {this.props.collections.map((collection) => {
              let className = 'collection-tree-menu__root-item';
              if (this.state.openedDrawer && this.state.openedDrawer.id === collection.id) {
                className += ' collection-tree-menu__root-item--selected';
              }
              const params = Object.assign({
                collectionId: collection.id,
                collectionSlug: slugify(collection.name)
              }, routeParams);
              return (
                <li className={className}
                  onMouseEnter={this.handleMouseEnter(collection)}>
                  <Text className="collection-tree-menu__root-item-label" size="medium">
                    <Link to="collection-slug" params={params}>
                      {collection.name}
                    </Link>
                  </Text>
                </li>
              );
            })}
          </ul>
          {this.state.openedDrawer && this.state.openedDrawer.children && this.state.openedDrawer.children.length > 0 ?
            <div className="collection-tree-menu__drawer">
              <div className="collection-tree-menu__drawer-block">
                <TreeMenu links={this.state.openedDrawer.children.map((collection) => {
                  return {
                    name: collection.name,
                    to: 'collection-slug',
                    params: Object.assign({
                      collectionId: collection.id,
                      collectionSlug: slugify(collection.name)
                    }, routeParams)
                  };
                })} />
              </div>
            </div>
            :
            null
          }
        </nav>
      </div>
    );
  }
}

CollectionTreeMenu.defaultProps = {
  collections: [],
};

CollectionTreeMenu.propTypes = {
  collections: PropTypes.array,
};

/**
 * Exports
 */
export default CollectionTreeMenu;

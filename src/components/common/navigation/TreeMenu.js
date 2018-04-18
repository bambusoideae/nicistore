/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';

// Selectors
import { selectResponsiveBreakpoint } from '../../../selectors/responsive';

// Required Components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class TreeMenu extends React.Component {
  constructor(props) {
    super(props);

    const { breakpoint } = this.props;

    // Initial State
    this.state = {
      breakpoint,
      opened: breakpoint === 'wide-screens' || breakpoint === 'medium-screens'
    };

    // This binding is necessary to make `this` work in the callback
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./TreeMenu.scss');
  }

  componentWillReceiveProps(nextProps) {
    const { breakpoint } = nextProps;
    this.setState({
      breakpoint,
      opened: breakpoint === 'wide-screens' || breakpoint === 'medium-screens'
    });
  }

  // View Controllers
  handleTitleClick() {
    if (this.state.breakpoint === 'handhelds') {
      this.setState({ opened: !this.state.opened });
    }
  }

  handleItemClick(id, evt) {
    evt.stopPropagation();
    if (id === this.props.selected) {
      this.props.onClick(null);
    } else if (id !== this.props.self) {
      this.props.onClick(id);
    }
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //

    // Process title class
    let titleClass = 'tree-menu__title';
    if (this.state.breakpoint === 'handhelds') {
      titleClass += ' tree-menu__title--clickable';
    }

    // Process body class
    let bodyClass = 'tree-menu__body';
    if (!this.state.opened) {
      bodyClass += ' tree-menu__body--closed';
    }

    // If applicable, return title actions UI block
    const titleActions = () => {
      if (this.state.breakpoint === 'handhelds') {
        if (this.state.opened === true) {
          return <span className="tree-menu__collapse-btn">-</span>;
        }

        return <span className="tree-menu__expand-btn">+</span>;
      }
    };

    // Returns the class name for given item
    const getItemClass = (item) => {
      let itemClass = 'tree-menu__item';
      if (item.id === this.props.selected) {
        itemClass += ' tree-menu__item--selected';
      }
      if (item.id === this.props.self) {
        itemClass += ' tree-menu__item--self';
      }
      return itemClass;
    };

    // Returns the children block
    const children = (item) => {
      if (item.children && item.children.length > 0) {
        return item.children.map((child) => {
          return (
            <ul className="tree-menu__child">
              <li onClick={() => { this.handleItemClick(child.id); }} role="menuitem">
                <div className={getItemClass(child)}>
                  <Text size="small">
                    <span className="tree-menu__link">
                      {child.name}
                    </span>
                  </Text>
                </div>
                {children(child)}
              </li>
            </ul>
          );
        });
      }
    };

    // Returns the items block according to what was provided (i.e. links, items, etc)
    const items = () => {
      if (this.props.links) {
        return this.props.links.map((link) => {
          let itemClass = 'tree-menu__item';
          if (link.selected === true) {
            itemClass += ' tree-menu__item--selected';
          }
          return (
            <li className={itemClass}>
              <Link className="tree-menu__link"
                to={link.to}
                params={link.params}
                query={link.query}>
                <Text size="small">{link.name}</Text>
              </Link>
            </li>
          );
        });
      } else if (this.props.items) {
        return this.props.items.map((item) => {
          return (
            <li onClick={() => this.handleItemClick(item.id)} role="menuitem">
              <div className={getItemClass(item)}>
                <Text size="small">
                  <span className="tree-menu__link">
                    {item.name}
                  </span>
                </Text>
              </div>
              {children(item)}
            </li>
          );
        });
      }
    };

    //
    // Return
    //
    return (
      <div className="tree-menu">
        {this.props.children ?
          <div className={titleClass} onClick={this.handleTitleClick} role="presentation">
            <div className="tree-menu__title-label">
              <Heading size="small">{this.props.children}</Heading>
            </div>
            <div className="tree-menu__title-actions">
              {titleActions()}
            </div>
          </div>
          :
          null
        }
        <div className={bodyClass}>
          <ul>
            {items()}
          </ul>
        </div>
      </div>
    );
  }
}

TreeMenu.defaultProps = {
  onClick: (value) => { debug(`onClick not defined. Value: ${value}`); },
  children: undefined,
  breakpoint: 'handhelds', // Mobile first
  selected: undefined,
  self: undefined,
  links: [],
  items: [],
};

TreeMenu.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  breakpoint: PropTypes.string,
  selected: PropTypes.any,
  self: PropTypes.any,
  links: PropTypes.array,
  items: PropTypes.array,
};

/**
 * Redux
 */
const mapStateToProps = createStructuredSelector({
  breakpoint: selectResponsiveBreakpoint
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

const TreeMenuWrapper = connect(
  mapStateToProps,
  // mapDispatchToProps
)(TreeMenu);

/**
 * Exports
 */
export default TreeMenuWrapper;

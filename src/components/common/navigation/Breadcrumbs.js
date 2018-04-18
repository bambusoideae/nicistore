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


// Required components
import Text from '../typography/Text';


/**
 * Component
 */
class Breadcrumbs extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Breadcrumbs.scss');
  }

  // Template
  render() {
    //
    const { breakpoint } = this.props;
    // In mobile, only last crumb with link is shown. Figure out what it is.
    let backLink;
    const links = this.props.links.filter((l) => l.to && l.params);
    if (links.length > 0) {
      backLink = links[links.length - 1];
    }

    // Current crumb weight
    let currentWeight = 'normal';
    if (this.props.weight === 'bold') {
      currentWeight = 'bold';
    }

    return (
      <div className="breadcrumbs">
        {breakpoint !== 'handhelds' || this.props.disableResponsive ?
          <nav>
            <ul className="breadcrumbs__list">
              {this.props.links && this.props.links.map((link) => {
                if (link.to && link.params) {
                  return (
                    <li className="breadcrumbs__list-item">
                      <Link className="breadcrumbs__link" to={link.to} params={link.params}>
                        <Text size="small">{link.name}</Text>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li className="breadcrumbs__list-item">
                    <Text size="small" weight="bold">{link.name}</Text>
                  </li>
                );
              })}
              {this.props.children ?
                <li className="breadcrumbs__list-item">
                  <Text size="small" weight={currentWeight}>
                    {this.props.children}
                  </Text>
                </li>
                :
                null
              }
            </ul>
          </nav>
          :
          <div className="breadcrumbs__back">
            {backLink ?
              <Link className="breadcrumbs__back-link" to={backLink.to} params={backLink.params}>
                <Text>
                  &#10094; {backLink.name}
                </Text>
              </Link>
              :
              null
            }
          </div>
        }
      </div>
    );
  }
}

Breadcrumbs.defaultProps = {
  children: undefined,
  breakpoint: 'handhelds', // Mobile first
  disableResponsive: false,
  links: [],
  weight: 'normal',
};

Breadcrumbs.propTypes = {
  children: PropTypes.any,
  breakpoint: PropTypes.string,
  disableResponsive: PropTypes.bool,
  links: PropTypes.array,
  weight: PropTypes.string,
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

const BreadcrumbsWrapper = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Breadcrumbs);

/**
 * Exports
 */
export default BreadcrumbsWrapper;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component
 */
class Heading extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Heading.scss');
  }

  render() {
    //
    // Process CSS classes according to settings
    //
    let headingClass = 'heading';

    // Size
    if (['small', 'medium', 'large'].indexOf(this.props.size) !== -1) {
      headingClass += ` heading-${this.props.size}`;
    } else {
      headingClass += ' heading-medium';
    }

    // Alignment
    if (['left', 'center', 'right'].indexOf(this.props.align) !== -1) {
      headingClass += ` heading--align-${this.props.align}`;
    }

    //
    // Return element with tag according to size
    //
    const el = (children) => {      
      if (this.props.size === 'large') {
        return <h1>{children}</h1>;
      } else if (this.props.size === 'small') {
        return <h3>{children}</h3>;
      }

      return <h2>{children}</h2>;
    };

    //
    // Return
    //
    return (
      <div className={headingClass}>
        {el(this.props.children)}
      </div>
    );
  }
}

Heading.defaultProps = {
  children: undefined,
  size: 'medium',
  align: undefined,
};

Heading.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  align: PropTypes.string,
};

/**
 * Exports
 */
export default Heading;

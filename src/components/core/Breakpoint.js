/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

// Selectors
import { selectResponsiveBreakpoint } from '../../selectors/responsive';


/**
 * Component
 */
class Breakpoint extends React.Component {
  // constructor(props) {
  //   super(props);

  //   const { _breakpoint } = props;

  //   // Initial State
  //   this.state = {
  //     breakpoint: _breakpoint
  //   };
  // }

  // // Component Lifecycle
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ breakpoint: nextProps._breakpoint });
  // }

  // Template
  render() {
    if (this.props.breakpoint === this.props.point) {
      return <div>{this.props.children}</div>;
    }

    return null;
  }
}

Breakpoint.defaultProps = {
  children: undefined,
  breakpoint: 'handhelds', // Mobile first
  point: undefined,
};

Breakpoint.propTypes = {
  children: PropTypes.any,
  breakpoint: PropTypes.string,
  point: PropTypes.any,
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

const BreakpointWrapper = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Breakpoint);


/**
 * Export
 */
export default BreakpointWrapper;

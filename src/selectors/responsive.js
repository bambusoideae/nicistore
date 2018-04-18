import { createSelector, createStructuredSelector } from 'reselect';

/**
 * Selectors
 */
const selectResponsive = (state) => state.get('responsive');

// const selectResponsiveBreakpoint = (state) => state.get('responsive').get('breakpoint');
const makeSelectResponsiveBreakpoint = () => createSelector(
  selectResponsive,
  (responsiveState) => responsiveState.get('breakpoint')
);

const selectResponsiveBreakpoint = makeSelectResponsiveBreakpoint();

export {
  makeSelectResponsiveBreakpoint,
  selectResponsiveBreakpoint,
};

import { createSelector, createStructuredSelector } from 'reselect';

/**
 * Selectors
 */
const selectGlobal = (state) => state.get('global');

const makeSelectOpenedDrawer = () => createSelector(
  selectGlobal,
  (global) => global.get('openedDrawer')
);

const selectOpenedDrawer = makeSelectOpenedDrawer();

export {
  selectGlobal,
  makeSelectOpenedDrawer,
  selectOpenedDrawer,
};

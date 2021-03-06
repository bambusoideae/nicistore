const debug = require('debug')('nicistore');

/**
 * Go through the route handlers that have page title and snippets definitions
 * and return the last one in the hierarchy
 */
export default function fetchPageTitleAndSnippets(context, state) {
  const routes = state.routes.filter((route) => {
    return route.handler.pageTitleAndSnippets;
  });
  if (routes.length > 0) {
    return routes[routes.length - 1].handler.pageTitleAndSnippets(context, state.params, state.query);
  }

  return null;
}

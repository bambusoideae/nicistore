/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';


// Translation data for this component
import messages from './Pagination.messages';

/**
 * Component
 */
class Pagination extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Pagination.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const query = this.props.query || {};
    const previousPage = (this.props.currentPage > 1) ? this.props.currentPage - 1 : 1;
    const nextPage = (this.props.currentPage < this.props.totalPages) ? this.props.currentPage + 1 : this.props.totalPages;

    const pageLinks = () => {
      const links = [];
      for (let i = 0; i < this.props.totalPages; i++) {
        if ((i + 1) === this.props.currentPage) {
          links.push(
            <li key={i} className="pagination__item pagination__item--selected">
              {i + 1}
            </li>
          );
        } else {
          links.push(
            <li key={i} className="pagination__item">
              <Link className="pagination__link"
                to={this.props.to}
                params={this.props.params}
                query={Object.assign({ page: i + 1 }, query)}>
                {i + 1}
              </Link>
            </li>
          );
        }
      }
      return links;
    };

    //
    // Return
    //
    return (
      <div className="pagination">
        <ul>
          <li className="pagination__item">
            <Link className="pagination__link"
              to={this.props.to}
              params={this.props.params}
              query={Object.assign({ page: previousPage }, query)}>
              <FormattedMessage {...messages.previous} />
            </Link>
          </li>
          {pageLinks()}
          <li className="pagination__item">
            <Link className="pagination__link"
              to={this.props.to}
              params={this.props.params}
              query={Object.assign({ page: nextPage }, query)}>
              <FormattedMessage {...messages.next} />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Pagination.defaultProps = {
  query: undefined,
  currentPage: undefined,
  totalPages: undefined,
  params: undefined,
  to: undefined,
};

Pagination.propTypes = {
  query: PropTypes.any,
  currentPage: PropTypes.any,
  totalPages: PropTypes.any,
  params: PropTypes.any,
  to: PropTypes.any,
};

/**
 * Exports
 */
export default Pagination;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { slugify } from '../../../utils/strings';


// Required components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

/**
 * Component
 */
class ArticleSuggestions extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ArticleSuggestions.scss');
  }

  // Template
  render() {
    const routeParams = {}; // Base route params
    return (
      <div className="article-suggestions">
        {this.props.children ?
          <Heading size="small" align="center">{this.props.children}</Heading>
          :
          null
        }
        <div className="article-suggestions__list">
          {this.props.articles.map((article) => {
            const articleRouteParams = Object.assign({
              contentId: article.id,
              contentSlug: slugify(article.name)
            }, routeParams);
            return (
              <div className="article-suggestions__item">
                <div className="article-suggestions__item-icon">
                  <i className="fa fa-file-text-o fa-2x" aria-hidden="true" />
                </div>
                <div className="article-suggestions__title">
                  <Link className="article-suggestions__link"
                    to="article-slug"
                    params={articleRouteParams}>
                    <Text>
                      {article.name}
                    </Text>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ArticleSuggestions.defaultProps = {
  articles: undefined,
  children: undefined,
};

ArticleSuggestions.propTypes = {
  articles: PropTypes.any,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default ArticleSuggestions;

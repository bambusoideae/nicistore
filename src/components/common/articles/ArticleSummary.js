/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { slugify } from '../../../utils/strings';


// Required components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

// Translation data for this component
import messages from './ArticleSummary.messages';

/**
 * Component
 */
class ArticleSummary extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ArticleSummary.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params
    const articleRouteParams = Object.assign({
      contentId: this.props.content.id,
      contentSlug: slugify(this.props.content.name)
    }, routeParams);

    let headingSize = 'medium';
    if (['small', 'large'].indexOf(this.props.size) !== -1) {
      headingSize = this.props.size;
    }

    let showReadMore = this.props.content.body.markdown
      && this.props.content.body.markdown !== ''
      && !this.props.hideLink;

    //
    // Return
    //
    return (
      <div className="article-summary">
        <Heading size={headingSize}>
          {this.props.content.name}
        </Heading>
        <div className="article-summary__content">
          <Text size="small">
            {this.props.content.body.summary}
            {showReadMore ?
              <Link className="article-summary__link"
                to="article-slug"
                params={articleRouteParams}>
                <FormattedMessage {...messages.readMore} />
                <i className="fa fa-file-text-o" aria-hidden="true" />
              </Link>
              :
              null
            }
          </Text>
        </div>
      </div>
    );
  }
}

ArticleSummary.defaultProps = {
  content: undefined,
  hideLink: false,
  size: 'medium',
};

ArticleSummary.propTypes = {
  content: PropTypes.undefined,
  hideLink: PropTypes.bool,
  size: PropTypes.string,
};

/**
 * Exports
 */
export default ArticleSummary;

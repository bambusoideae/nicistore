/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import marked from 'marked';


/**
 * Component
 */
class MarkdownHTML extends React.Component {
  componentDidMount() {        
    // Component styles
    require('./MarkdownHTML.scss');
  }

  render() {
    /* eslint-disable react/no-danger */
    return (
      <div
        className="markdown-html"
        dangerouslySetInnerHTML={{ __html: marked(this.props.children || '') }}
      />
    );
    /* eslint-enable */
  }
}

MarkdownHTML.defaultProps = {
  children: '',
};

MarkdownHTML.propTypes = {
  children: PropTypes.any,
};

/**
 * Exports
 */
export default MarkdownHTML;

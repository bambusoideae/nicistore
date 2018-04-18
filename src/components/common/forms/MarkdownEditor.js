/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import FormLabel from './FormLabel';
import Textarea from './Textarea';

// DOM Id Generator
import domIdGenerator from '../../../utils/domIdGenerator';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      text: 'Fusce dapibus, tellus ac cursus commodo'
    };

    // Generate uid for toggle switch
    this.markdownEditorId = `markdown-editor-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./MarkdownEditor.scss');
  }

  // View Controllers
  handleChange = (text, medium) => {
    this.setState({ text });
  };

  // Template
  render() {
    const { markdownEditorId } = this;

    return (
      <div className="markdown-editor">
        {this.props.label ?
          <div className="markdown-editor__label">
            <FormLabel for={markdownEditorId}>{this.props.label}</FormLabel>
          </div>
          :
          null
        }
        <Textarea rows="20"
          value={this.props.value}
          onChange={this.props.onChange} />
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  label: undefined,
  value: undefined,
};

MarkdownEditor.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.any,
  value: PropTypes.any,
};

/**
 * Exports
 */
export default MarkdownEditor;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


// Required components
import FormLabel from './FormLabel';
import Text from '../typography/Text';

// DOM Id Generator
import domIdGenerator from '../../../utils/domIdGenerator';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class Textarea extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.textAreaId = `textarea-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Textarea.scss');
  }

  // View Controllers
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  // Template
  render() {
    const { textAreaId } = this;

    let textareaClass = 'textarea__input';
    if (this.props.error) {
      textareaClass += ' textarea__input--error';
    }

    return (
      <div className="textarea">
        {this.props.label ?
          <div className="textarea__label">
            <FormLabel for={textAreaId}>{this.props.label}</FormLabel>
          </div>
          :
          null
        }
        <div>
          <textarea id={textAreaId}
            className={textareaClass}
            rows={this.props.rows}
            onChange={this.handleChange}
            value={this.props.value}
            disabled={this.props.disabled} />
        </div>
        {this.props.error ?
          <div className="input-field__error">
            <Text size="small">{this.props.error}</Text>
          </div>
          :
          null
        }
      </div>
    );
  }
}


Textarea.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  error: undefined,
  label: undefined,
  rows: undefined,
  value: undefined,
  disabled: undefined,
};

Textarea.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.any,
  label: PropTypes.any,
  rows: PropTypes.any,
  value: PropTypes.any,
  disabled: PropTypes.any,
};

/**
 * Exports
 */
export default Textarea;

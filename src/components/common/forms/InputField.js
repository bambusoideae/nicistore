/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import FormLabel from '../forms/FormLabel';
import Text from '../typography/Text';

// DOM Id Generator
import domIdGenerator from '../../../utils/domIdGenerator';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class InputField extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.inputFieldId = `input-field-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./InputField.scss');
  }

  // View Controllers
  handleChange = (evt) => {
    this.props.onChange(evt.target.value);
  };

  handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      this.props.onEnterPress();
    }
  };

  // Template
  render() {
    const { inputFieldId } = this;

    let inputClass = 'input-field__input';
    if (this.props.error) {
      inputClass += ' input-field__input--error';
    }

    let inputType = 'text';
    if (['password'].indexOf(this.props.type) !== -1) {
      inputType = this.props.type;
    }

    return (
      <div className="input-field">
        {this.props.label ?
          <div className="input-field__label">
            <FormLabel for={inputFieldId} size={this.props.labelSize} weight={this.props.labelWeight}>
              {this.props.label}
            </FormLabel>
          </div>
          :
          null
        }
        <div>
          <input id={inputFieldId}
            className={inputClass}
            type={inputType}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={this.props.value} />
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

InputField.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  onEnterPress: () => debug('onEnterPress not defined'),
  error: undefined,
  type: 'text',
  label: undefined,
  labelSize: undefined,
  labelWeight: undefined,
  placeholder: undefined,
  value: undefined,
};

InputField.propTypes = {
  onChange: PropTypes.func,
  onEnterPress: PropTypes.func,
  error: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.any,
  labelSize: PropTypes.any,
  labelWeight: PropTypes.any,
  placeholder: PropTypes.any,
  value: PropTypes.any,
};

/**
 * Exports
 */
export default InputField;

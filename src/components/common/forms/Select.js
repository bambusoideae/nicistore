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
class Select extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.selectId = `select-${domIdGenerator.getUniqueId()}`;
  }

  // Componet Lifecycle
  componentDidMount() {
    // Component styles
    require('./Select.scss');
  }

  // View Controllers
  handleSelectChange = (event) => {
    const value = event.target.value;
    // this.setState({ value: value });
    this.props.onChange(value);
  };

  // Template
  render() {
    //
    // Helper methods and variables
    //
    const { selectId } = this;
    const options = this.props.options;

    let componentClass = 'select';
    if (this.props.className) {
      componentClass += ` ${this.props.className}`;
    }

    let selectClass = 'select__select';
    if (this.props.error) {
      selectClass += ' select__select--error';
    }

    // Size
    if (['small', 'large'].indexOf(this.props.size) !== -1) {
      selectClass += ` select__select--${this.props.size}`;
    } else {
      selectClass += ' select__select--medium';
    }

    //
    // Return
    //
    return (
      <div className={componentClass}>
        {this.props.label ?
          <div className="select__label">
            <FormLabel for={selectId} weight={this.props.labelWeight} size={this.props.labelSize}>
              {this.props.label}
            </FormLabel>
          </div>
          :
          null
        }
        <select key={selectId}
          id={selectId}
          className={selectClass}
          value={this.props.value}
          onChange={this.handleSelectChange}>
          {this.props.placeholder ?
            <option value="" disabled>{this.props.placeholder}</option>
            :
            null
          }
          {options.map((opt, idx) => {
            return (
              <option key={opt.id || idx} value={opt.value}>
                {opt.name}
              </option>
            );
          })}
        </select>
        {this.props.error ?
          <div className="select__error">
            <Text size="small">{this.props.error}</Text>
          </div>
          :
          null
        }
      </div>
    );
  }
}

Select.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  options: [],
  value: '',
  className: undefined,
  error: undefined,
  size: 'medium',
  label: undefined,
  labelWeight: undefined,
  labelSize: undefined,
  placeholder: undefined,
};

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.any,
  className: PropTypes.string,
  error: PropTypes.any,
  size: PropTypes.string,
  label: PropTypes.any,
  labelWeight: PropTypes.string,
  labelSize: PropTypes.string,
  placeholder: PropTypes.any,
};

/**
 * Exports
 */
export default Select;

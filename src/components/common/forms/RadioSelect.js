/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import Text from '../typography/Text';

// DOM Id Generator
import domIdGenerator from '../../../utils/domIdGenerator';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class RadioSelect extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.groupId = `radio-select-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./RadioSelect.scss');
  }

  // Template
  render() {
    const { groupId } = this;

    return (
      <div className="radio-select">
        {this.props.options.map((option) => {
          let radioId = `radio-${domIdGenerator.getUniqueId()}`;
          return (
            <div key={radioId} className="radio-select__input-option">
              <div className="radio-select__item">
                <div className="radio-select__input">
                  <input
                    id={radioId}
                    name={groupId}
                    type="radio"
                    onChange={() => this.props.onChange(option.value)}
                    checked={this.props.value === option.value} />
                </div>
                <div className="radio-select__label">
                  <label htmlFor={radioId}>
                    <Text size="small">
                      {option.name}
                    </Text>
                    {option.detail ?
                      <Text className="radio-select__option-detail" size="small" weight="bold">
                        {option.detail}
                      </Text>
                      :
                      null
                    }
                  </label>
                </div>
              </div>
              {this.props.value === option.value && option.children ?
                <div className="radio-select__children">
                  {option.children}
                </div>
                :
                null
              }
            </div>
          );
        })}
      </div>
    );
  }
}


RadioSelect.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
  options: [],
  value: undefined,
};

RadioSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.any,
};

/**
 * Exports
 */
export default RadioSelect;

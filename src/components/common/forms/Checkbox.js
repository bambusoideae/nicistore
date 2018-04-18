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
const debug = require('debug')('nicistore');

/**
 * Components
 */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.checkboxId = `checkbox-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Checkbox.scss');
  }

  // Template
  render() {
    const { checkboxId } = this;

    return (
      <div className="checkbox">
        <div className="checkbox__input">
          <input id={checkboxId}
            type="checkbox"
            checked={this.props.checked}
            onChange={this.props.onChange} />
        </div>
        {this.props.label ?
          <div className="checkbox__label">
            <label htmlFor={checkboxId}>
              <Text size="small">{this.props.label}</Text>
            </label>
          </div>
          :
          null
        }
      </div>
    );
  }
}

Checkbox.defaultProps = {
  onChange: () => { debug('onChange not defined'); },
  checked: undefined,
  label: undefined,
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.any,
  label: PropTypes.any,
};


/**
 * Exports
 */
export default Checkbox;

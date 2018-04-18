/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';


// Required components
import FormLabel from '../forms/FormLabel';

// DOM Id Generator
import domIdGenerator from '../../../utils/domIdGenerator';

// Instantiate logger
const debug = require('debug')('nicistore');

/**
 * Component
 */
class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);

    // Generate uid for toggle switch
    this.toggleSwitchId = `toggle-switch-${domIdGenerator.getUniqueId()}`;
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ToggleSwitch.scss');
  }

  // Template
  render() {
    // const id = `toggle-switch-${domIdGenerator.getUniqueId()}`;
    const { toggleSwitchId } = this;

    let toggleClass = 'toggle-switch';
    if (['small', 'large'].indexOf(this.props.size) !== -1) {
      toggleClass += ` toggle-switch-${this.props.size}`;
    } else {
      toggleClass += ' toggle-switch-medium';
    }

    if (this.props.inline) {
      toggleClass += ' toggle-switch--inline';
    }

    let inputClass = 'cmn-toggle';
    if (this.props.type === 'flat') {
      inputClass += ' cmn-toggle-round-flat';
    } else {
      inputClass += ' cmn-toggle-round';
    }

    let labelClass = 'toggle-switch__label';
    if (this.props.inline) {
      labelClass += ' toggle-switch__label--inline';
    }

    return (
      <div className={toggleClass}>
        {this.props.label ?
          <div className={labelClass}>
            <FormLabel for={toggleSwitchId}>{this.props.label}</FormLabel>
          </div>
          :
          null
        }
        <input id={toggleSwitchId}
          className={inputClass}
          type="checkbox"
          checked={this.props.enabled}
          onChange={this.props.onChange} />
        <label htmlFor={toggleSwitchId} />
      </div>
    );
  }
}

ToggleSwitch.defaultProps = {
  onChange: () => debug('onChange not defined'),
  size: 'medium',
  inline: undefined,
  type: 'round',
  label: undefined,
  enabled: undefined,
};

ToggleSwitch.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  inline: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.any,
  enabled: PropTypes.any,
};

/**
 * Exports
 */
export default ToggleSwitch;

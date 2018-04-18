/**
 * Imports
 */
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

// Required components
import Text from '../../typography/Text';

// Translation data for this component
import messages from './HeaderHighlight.messages';

/**
 * Component
 */
class HeaderHighlight extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./HeaderHighlight.scss');
  }

  // Template
  /* eslint-disable react/style-prop-object */
  render() {
    return (
      <div className="header-highlight">
        <div className="header-highlight__shipping-icon">
          <i className="fa fa-truck" aria-hidden="true" />
        </div>
        <div className="header-highlight__shipping-text">
          <Text size="small" weight="bold">
            <FormattedMessage {...messages.freeShipping} />
            &nbsp;
            <FormattedNumber value="19.90" style={'currency'} currency="EUR" />
          </Text>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

/**
 * Exports
 */
export default HeaderHighlight;

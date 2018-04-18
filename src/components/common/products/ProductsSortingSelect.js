/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';


// Required components
import Select from '../forms/Select';
import Text from '../typography/Text';

// Translation data for this component
import messages from './ProductsSortingSelect.messages';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ProductsSortingSelect extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./ProductsSortingSelect.scss');
  }

  // Template
  render() {
    // Sorting Options
    const sortOptions = [
      // {
      //   name: <FormattedMessage
      //   message={intlStore.getMessage(intlData, 'sortFeatured')}
      //   locales={intlStore.getCurrentLocale()} />,
      //   value: 'featured'
      // },
      // {
      //   name: <FormattedMessage
      //   message={intlStore.getMessage(intlData, 'sortBestSelling')}
      //   locales={intlStore.getCurrentLocale()} />,
      //   value: 'best-selling'
      // },
      {
        name: <FormattedMessage {...messages.sortAlphabetically} />,
        value: 'alphabetically'
      },
      {
        name: <FormattedMessage {...messages.sortAlphabeticallyReverse} />,
        value: '-alphabetically'
      },
      {
        name: <FormattedMessage {...messages.sortPrice} />,
        value: 'price'
      },
      {
        name: <FormattedMessage {...messages.sortPriceReverse} />,
        value: '-price'
      },
      {
        name: <FormattedMessage {...messages.sortRecent} />,
        value: '-date'
      },
      {
        name: <FormattedMessage {...messages.sortOldest} />,
        value: 'date'
      }
    ];

    return (
      <div className="products-sorting-select">
        <div className="products-sorting-select__label">
          <Text size="small" weight="bold">
            <FormattedMessage {...messages.sortLabel} />
          </Text>
        </div>
        <div className="products-sorting-select__options">
          <Select size="small"
            options={sortOptions}
            placeholder
            onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}

ProductsSortingSelect.defaultProps = {
  onChange: (value) => debug(`onChange not defined. Value: ${value}`),
};

ProductsSortingSelect.propTypes = {
  onChange: PropTypes.func,
};

/**
 * Exports
 */
export default ProductsSortingSelect;

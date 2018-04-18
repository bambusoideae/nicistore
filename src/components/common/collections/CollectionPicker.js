/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import Checkbox from '../forms/Checkbox';
import FormLabel from '../forms/FormLabel';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CollectionPicker extends React.Component {    
  // Component Lifecycle
  componentDidMount() {  
    // Component styles
    require('./CollectionPicker.scss');
  }

  // View Controllers
  handleCollectionChange = (collectionId) => {
    if (!this.props.checked) {
      this.props.onChange([collectionId]);
    } else if (this.props.checked.indexOf(collectionId) === -1) {
      const result = this.props.checked;
      result.push(collectionId);
      this.props.onChange(result);
    } else {
      const checked = this.props.checked;
      checked.splice(checked.indexOf(collectionId), 1);
      this.props.onChange(checked);
    }
  };

  // Template
  render() {
    return (
      <div className="collection-picker">
        {this.props.children ?
          <FormLabel>{this.props.children}</FormLabel>
          :
          null
        }
        {this.props.collections.map((collection, idx) => {
          let name = collection.name;
          let checkboxClass = 'collection-picker__checkbox';
          if (collection.enabled !== true) {
            checkboxClass += ' collection-picker__checkbox--disabled';
          }
          return (
            <div key={collection.id || collection._id || idx} className={checkboxClass}>
              <Checkbox label={name}
                onChange={() => this.handleCollectionChange(collection.id)}
                checked={this.props.checked.indexOf(collection.id) !== -1} />
            </div>
          );
        })}
      </div>
    );
  }
}

CollectionPicker.defaultProps = {
  onChange: () => debug('onChange not defined'),
  children: undefined,
  collections: [],
  checked: undefined,
};

CollectionPicker.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.any,
  collections: PropTypes.any,
  checked: PropTypes.any,
};

/**
 * Exports
 */
export default CollectionPicker;

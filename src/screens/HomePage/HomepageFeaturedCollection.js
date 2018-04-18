/**
 * Imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


// Required components
import Text from '../../components/common/typography/Text';

/**
 * Component.
 */
class HomepageFeaturedCollection extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./HomepageFeaturedCollection.scss');
  }

  // Template
  render() {
    if (this.props.feature && this.props.feature.img) {
      return (
        <div className="homepage-featured-collection">
          <Link to={this.props.feature.link.to} params={this.props.feature.link.params}>
            <img className="homepage-featured-collection__image" src={this.props.feature.img.src} alt={this.props.feature.img.alt} />
          </Link>
        </div>
      );
    } else if (this.props.feature) {
      return (
        <div className="homepage-featured-collection homepage-featured-collection__placeholder">
          <Link to={this.props.feature.link.to} params={this.props.feature.link.params}>
            <div>
              <Text size="large">
                {this.props.feature.name}
              </Text>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div className="homepage-featured-collection homepage-featured-collection__placeholder" />
    );
  }
}

HomepageFeaturedCollection.defaultProps = {
  feature: undefined,
};

HomepageFeaturedCollection.propTypes = {
  feature: PropTypes.any,
};

/**
 * Export.
 */
export default HomepageFeaturedCollection;

/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class UserComment extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      defaultAvatar: require('./default_avatar.jpg')
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./UserComment.scss');
  }

  // Template
  render() {
    return (
      <div className="user-comment">
        <div className="user-comment__avatar">
          <div className="user-comment__avatar-image">
            {this.props.avatar ?
              <img src={this.props.avatar} alt="Avatar" />
              :
              <img src={this.state.defaultAvatar} alt="Default avatar" />
            }
          </div>
        </div>
        <div className="user-comment__content">
          <div className="user-comment__details">
            <div className="user-comment__author" itemProp="name">
              <Text size="small" weight="bold">{this.props.author}</Text>
            </div>
            <div className="user-comment__date" itemProp="commentTime">
              <Text size="small">
                <i className="fa fa-clock-o" aria-hidden="true" />
                {moment(this.props.date).format('YYYY/MM/DD HH:mm:ss')}
              </Text>
            </div>
          </div>
          <div className="user-comment__message" itemProp="commentText">
            <Text>{this.props.children}</Text>
          </div>
        </div>
      </div>
    );
  }
}

UserComment.defaultProps = {
  avatar: undefined,
  date: undefined,
  author: undefined,
  children: undefined,
};

UserComment.propTypes = {
  avatar: PropTypes.any,
  date: PropTypes.date,
  author: PropTypes.any,
  children: PropTypes.any,
};

/**
 * Exports
 */
export default UserComment;

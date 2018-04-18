/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';


// Required components
import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import Textarea from '../forms/Textarea';

import UserComment from './UserComment';

// Translation data for this component
import messages from './CommentBox.messages';

// Instantiate debugger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      message: undefined,
      fieldErrors: {}
    };
  }

  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./CommentBox.scss');
  }

  // View Controllers
  handleTextareaChange = (value) => {
    this.setState({ message: value });
  };

  handleButtonClick = () => {
    this.setState({ fieldErrors: {} });
    const fieldErrors = {};
    if (!this.state.message) {
      fieldErrors.message = <FormattedMessage {...messages.fieldRequired} />;
    }
    this.setState({ fieldErrors });

    if (Object.keys(fieldErrors).length === 0) {
      this.props.onSubmitClick(this.state.message);
    }
  };

  // Template
  render() {
    //
    // Helper methods & variables
    //
    const routeParams = {}; // Base route params

    // Return the list UI block, according to whether there are comments or not
    const comments = () => {
      if (this.props.comments && this.props.comments.length > 0) {
        return (
          <div className="comment-box__list">
            {this.props.comments.map((comment) => {
              return (
                <div className="comment-box__comment-item">
                  <UserComment author={comment.user.name} date={comment.createdAt}>
                    {comment.message}
                  </UserComment>
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <div className="comment-box__no-comments">
          <Text>
            <FormattedMessage {...messages.noComments} />!
          </Text>
        </div>
      );
    };

    const loginTranslation = (
      <Link className="comment-box__link" to="login" params={routeParams}>
        <Text>
          <FormattedMessage {...messages.login} />
        </Text>
      </Link>
    );

    const registerTranslation = (
      <Link className="comment-box__link" to="register" params={routeParams}>
        <Text>
          <FormattedMessage {...messages.register} />
        </Text>
      </Link>
    );

    //
    // Return
    //
    return (
      <div className="comment-box">
        <div className="comment-box__comments" itemScope itemType="http://schema.org/UserComments">
          <Heading size="medium">
            <FormattedMessage {...messages.comments} total={(this.props.comments) ? this.props.comments.length : 0} />
          </Heading>
          {comments()}
        </div>
        {this.props.user ?
          <div className="comment-box__submit">
            <Textarea label={<FormattedMessage {...messages.leaveComment} />}
              onChange={this.handleTextareaChange}
              error={this.state.fieldErrors.message}
              disabled={this.props.disabled || this.props.loading} />
            <div className="comment-box__submit-actions">
              <div className="comment-box__button">
                <Button type="primary"
                  onClick={this.handleButtonClick}
                  disabled={this.props.disabled}
                  loading={this.props.loading}>
                  <i className="fa fa-comment-o" aria-hidden="true" />
                  &nbsp;
                  <FormattedMessage {...messages.submit} />
                </Button>
              </div>
            </div>
          </div>
          :
          <div className="comment-box__no-user">
            <Text>
              <FormattedMessage {...messages.noUser} login={loginTranslation} register={registerTranslation} />
            </Text>
          </div>
        }
      </div>
    );
  }
}


CommentBox.defaultProps = {
  onSubmitClick: (data) => debug(`onSubmitClick not defined. Value: ${data}`),
  user: undefined,
  comments: undefined,
  disabled: undefined,
  loading: undefined,
};

CommentBox.propTypes = {
  onSubmitClick: PropTypes.func,
  user: PropTypes.any,
  comments: PropTypes.any,
  disabled: PropTypes.any,
  loading: PropTypes.any,
};

/**
 * Exports
 */
export default CommentBox;

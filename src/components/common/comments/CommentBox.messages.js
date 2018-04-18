/*
 * CommentBox Messages
 *
 * This contains all the text for the CommentBox component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  comments: {
    id: 'app.components.common.CommentBox.comments',
    defaultMessage: '{total, plural, =1 {# Comment} other {# Comments}}',
  },
  fieldRequired: {
    id: 'app.components.common.CommentBox.fieldRequired',
    defaultMessage: 'This field is required',
  },
  leaveComment: {
    id: 'app.components.common.CommentBox.leaveComment',
    defaultMessage: 'Leave your comment',
  },
  login: {
    id: 'app.components.common.CommentBox.login',
    defaultMessage: 'login',
  },
  noComments: {
    id: 'app.components.common.CommentBox.noComments',
    defaultMessage: 'Be the first to comment',
  },
  noUser: {
    id: 'app.components.common.CommentBox.noUser',
    defaultMessage: 'In order to submit a comment, you must {login} or {register} first.',
  },
  register: {
    id: 'app.components.common.CommentBox.register',
    defaultMessage: 'create an account',
  },
  submit: {
    id: 'app.components.common.CommentBox.submit',
    defaultMessage: 'Submit',
  },
});

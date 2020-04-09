// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { resetCreateMessageStatus } from '../actions/index';
import setResetDelay from '../utils';
import { actions as actionsNew } from '../slices';

const MessagesStatus = ({ messagesLength }) => {
  // @ts-ignore
  const { status, text } = useSelector((state) => state.createMessageStatus);
  const dispatch = useDispatch();

  const statusByMessagesState = {
    none: (message) => (
      <Badge variant="primary">{message}</Badge>
    ),
    requested: (message) => (
      <Badge variant="info">{message}</Badge>
    ),
    finished: (message) => {
      setResetDelay(() => dispatch(actionsNew.resetCreateMessageStatus()), 500);
      return (
        <Badge variant="success">{message}</Badge>
      );
    },
    failed: (message) => {
      setResetDelay(() => dispatch(actionsNew.resetCreateMessageStatus()), 3500);
      return (
        <Badge variant="danger">{message}</Badge>
      );
    },
  };

  return (
    <div>
      <span className="small">
        <b>Messages: </b>
        <Badge variant="primary">{messagesLength}</Badge>
        {' '}
      </span>
      <span className="small">
        <b>Status: </b>
        {statusByMessagesState[status](text)}
      </span>
    </div>
  );
};

export default MessagesStatus;

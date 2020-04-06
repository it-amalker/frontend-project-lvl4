// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { resetCreateMessageStatus } from '../actions/index.js';
import setResetDelay from '../utils.js';

const MessagesStatus = ({ messagesLength }) => {
  // @ts-ignore
  const messageCreateState = useSelector(({ messageCreateState }) => messageCreateState);
  const dispatch = useDispatch();

  const statusByMessagesState = {
    none: () => (
      <Badge variant="primary">Start chatting</Badge>
    ),
    requested: () => (
      <Badge variant="info">Sending...</Badge>
    ),
    finished: () => {
      setResetDelay(() => dispatch(resetCreateMessageStatus()), 500);
      return (
        <Badge variant="success">Message sent</Badge>
      );
    },
    failed: () => {
      setResetDelay(() => dispatch(resetCreateMessageStatus()), 3500);
      return (
        <Badge variant="danger">Probably network problems, check network connection</Badge>
      );
    },
  };

  return (
    <div>
      <span className="small">
        <b>Messages: </b>
        <Badge variant="primary">{messagesLength}</Badge>{' '}
      </span>
      <span className="small">
        <b>Status: </b> 
        {statusByMessagesState[messageCreateState]()}
      </span>
    </div>
  );
};

export default MessagesStatus;

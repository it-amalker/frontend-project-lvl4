// @ts-check
/* eslint-disable react/display-name */

import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices';
import { setResetDelay } from '../utils';

const MessagesStatus = ({ messagesLength }) => {
  // @ts-ignore
  const { status, text } = useSelector((state) => state.createMessageStatus);
  const dispatch = useDispatch();

  const statuses = {
    none: (info) => (
      <Badge variant="primary">{info}</Badge>
    ),
    requested: (info) => (
      <Badge variant="info">{info}</Badge>
    ),
    finished: (info) => {
      setResetDelay(() => dispatch(actions.resetCreateMessageStatus()), 500);
      return (
        <Badge variant="success">{info}</Badge>
      );
    },
    failed: (info) => {
      setResetDelay(() => dispatch(actions.resetCreateMessageStatus()), 3500);
      return (
        <Badge variant="danger">{info}</Badge>
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
        {statuses[status](text)}
      </span>
    </div>
  );
};

export default MessagesStatus;

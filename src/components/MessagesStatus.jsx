// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';

const renderStatus = (errors, isSubmitting) => {
  if (errors) {
    return <Badge variant="danger">Probably network problems, check network connection</Badge>;
  }
  if (isSubmitting) {
    return <Badge variant="primary">Sending...</Badge>;
  }
  return <Badge variant="success">Start chatting</Badge>;
};

const MessagesStatus = ({ messagesLength, isSubmitting, errors }) => (
  <div>
    <span className="small">
      <b>Messages: </b>
      <Badge variant="primary">{messagesLength}</Badge>
      {' '}
    </span>
    <span className="small">
      <b>Status: </b>
      {renderStatus(errors.text, isSubmitting)}
    </span>
  </div>
);

export default MessagesStatus;

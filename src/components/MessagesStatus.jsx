// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';

const renderErrors = (errors) => (errors
  ? <Badge variant="danger">Probably network problems, check network connection</Badge>
  : null
);

const renderProcess = (isSubmitting) => (isSubmitting
  ? <Badge variant="primary">Sending...</Badge>
  : <Badge variant="success">Start chatting</Badge>
);

const MessagesStatus = ({ messagesLength, isSubmitting, errors }) => (
  <div>
    <span className="small">
      <b>Messages: </b>
      <Badge variant="primary">{messagesLength}</Badge>
      {' '}
    </span>
    <span className="small">
      <b>Status: </b>
      {renderErrors(errors.text) || renderProcess(isSubmitting)}
    </span>
  </div>
);

export default MessagesStatus;

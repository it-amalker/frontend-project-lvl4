// @ts-check

import React, { useContext, useEffect, useRef } from 'react';
import { Badge } from 'react-bootstrap';
import * as actions from '../actions/index.js';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import usernameContext from '../usernameContext.js';
import socket from '../socket.js';

const Chat = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  // @ts-ignore
  const messagesState = useSelector(({ messages }) => messages);
  // @ts-ignore
  const messageAddState = useSelector(({ messageCreateState }) => messageCreateState);
  const { currentChannelId } = channelsState;
  
  const messages = messagesState.messages.filter((m) => m.channelId === currentChannelId);
  const username = useContext(usernameContext);

  const dispatch = useDispatch();

  const span = useRef(null);
  
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      dispatch(actions.createMessage({ text, author: username, currentChannelId }));
      resetForm();
    },
  });

  useEffect(() => {
    socket.on('newMessage', ({ data }) => {
      dispatch(actions.createMessageSuccess({ message: data }));
    });
  }, []);

  const errors = {
    none: () => (
      <Badge variant="primary">Start typing message</Badge>
    ),
    finished: () => (
      <Badge variant="success">Ready</Badge>
    ),
    requested: () => (
      <Badge variant="primary">Sending...</Badge>
    ),
    failed: () => (
      <Badge variant="danger">Probably network problems, check network connection</Badge>
    ),
};
  
  const renderMessages = () => {
    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-1">
        {messages.map((message) => (
          <div key={message.id}>
            <b>{message.author}</b>
            :
            {` ${message.text}`}
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        {renderMessages()}
        <div className="mt-auto">
          <form onSubmit={formik.handleSubmit}>
            <input
              autoFocus
              className="form-control bg-light"
              name="text"
              type="text"
              value={formik.values.text}
              onChange={formik.handleChange} />
          </form>
          <span
            className="small">
              <b>Messages: </b>
              <Badge
                variant="primary">{messages.length}
              </Badge>{' '}
              <b>Status: </b> 
              {errors[messageAddState]()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;

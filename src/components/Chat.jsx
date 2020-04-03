// @ts-check

import React, { useContext, useEffect } from 'react';
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
  const dispatch = useDispatch();
  const { currentChannelId } = channelsState;
  const username = useContext(usernameContext);
  
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm }) => {
      try {
        await dispatch(actions.createMessage({ text, author: username, currentChannelId }));
      } catch (e) {
        throw new Error(`Cannot create new message, something wrong: ${e}`);
      }
      resetForm();
    },
  });

  useEffect(() => {
    socket.on('newMessage', ({ data }) => {
      if (data.attributes.author !== username) {
        dispatch(actions.createMessageSuccess({ message: data }));
      }
    });
  }, []);
  
  const renderMessages = () => {
    return (
      <div className="messages-block overflow-auto mb-3">
        {messagesState.messages.map((message) => (
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
              className="form-control"
              name="text"
              type="text"
              value={formik.values.text}
              onChange={formik.handleChange} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

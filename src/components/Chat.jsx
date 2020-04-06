// @ts-check

import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../actions/index.js';
import socket from '../socket.js';
import MessagesStatus from './MessagesStatus.jsx';
import ChatField from './ChatField.jsx';

const Chat = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  const { currentChannelId } = channelsState;

  // @ts-ignore
  const messagesState = useSelector(({ messages }) => messages);
  const messages = messagesState.messages.filter((m) => m.channelId === currentChannelId);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', ({ data }) => {
      dispatch(actions.createMessageSuccess({ message: data }));
    });
  }, []);
  
  const renderMessages = () => {
    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-1">
        {messages.map(({ id, author, text }) => (
          <div key={id}>
            <b>{author}</b>
            :
            {` ${text}`}
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
          {<ChatField />}
          {<MessagesStatus messagesLength={messages.length} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;

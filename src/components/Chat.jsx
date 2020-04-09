// @ts-check

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createMessageSuccess } from '../actions/index';
import socket from '../socket';
import MessagesStatus from './MessagesStatus';
import ChatField from './ChatField';
import { actions } from '../slices';

const Chat = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { currentChannelId } = useSelector((state) => state.channels);

  // @ts-ignore
  const messagesState = useSelector((state) => state.messages);
  const messages = messagesState.messages.filter((m) => m.channelId === currentChannelId);

  useEffect(() => {
    socket.on('newMessage', ({ data }) => {
      dispatch(actions.updateMessages({ message: data }));
    });
  }, []);

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-1">
      {messages.map(({ id, author, text }) => (
        <div key={id}>
          <b>{author}</b>
          :
          {` ${text}`}
        </div>
      ))}
    </div>
  );

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

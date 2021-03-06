// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import gon from 'gon';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';
import reducer, { actions } from './slices';

import App from './components/App';
import UsernameContext from './UsernameContext';

const socket = io();

const { channels, messages, currentChannelId } = gon;
const {
  initState,
  createMessage,
  createChannel,
  removeChannel,
  renameChannel,
} = actions;

const getUsernameFromCookies = () => {
  const username = faker.fake('{{internet.userName}}');
  if (!Cookies.get('username')) {
    Cookies.set('username', username);
  }
  return Cookies.get('username');
};

export default () => {
  const store = configureStore({ reducer });

  store.dispatch(initState({ channels, messages, currentChannelId }));

  socket.on('newMessage', ({ data }) => {
    store.dispatch(createMessage({ message: data }));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(createChannel({ channel: data }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel({ channel: attributes }));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UsernameContext.Provider value={getUsernameFromCookies()}>
        <App />
      </UsernameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

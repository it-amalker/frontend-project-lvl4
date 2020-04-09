// @ts-check

// @ts-ignore
import gon from 'gon'; // eslint-disable-line import/no-unresolved
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import faker from 'faker';
import reducer, { actions } from './slices';

import App from './components/App';
import UsernameContext from './UsernameContext';

const getUsernameFromCookies = () => {
  const username = faker.fake('{{internet.userName}}');
  if (!Cookies.get('username')) {
    Cookies.set('username', username);
  }
  return Cookies.get('username');
};

const { messages } = gon;
const { channels, currentChannelId } = gon;

export default () => {
  console.log('gon', gon);

  const store = configureStore({ reducer });

  store.dispatch(actions.initMessagesState({ messages }));
  store.dispatch(actions.initChannelsState({ channels, currentChannelId }));

  ReactDOM.render(
    <Provider store={store}>
      <UsernameContext.Provider value={getUsernameFromCookies()}>
        <App />
      </UsernameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

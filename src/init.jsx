// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import gon from 'gon';
import Cookies from 'js-cookie';
import faker from 'faker';
import reducer, { actions } from './slices';

import App from './components/App';
import UsernameContext from './UsernameContext';

const { messages } = gon;
const { channels, currentChannelId } = gon;

const getUsernameFromCookies = () => {
  const username = faker.fake('{{internet.userName}}');
  if (!Cookies.get('username')) {
    Cookies.set('username', username);
  }
  return Cookies.get('username');
};

export default () => {
  console.log(gon);

  const store = configureStore({ reducer });

  store.dispatch(actions.initState({ channels, messages, currentChannelId }));

  ReactDOM.render(
    <Provider store={store}>
      <UsernameContext.Provider value={getUsernameFromCookies()}>
        <App />
      </UsernameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

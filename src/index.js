// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// @ts-ignore
import gon from 'gon'; // eslint-disable-line import/no-unresolved
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import { initState } from './actions/index';

import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  ),
);

store.dispatch(initState(gon));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);

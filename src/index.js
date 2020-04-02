// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
import { initState } from './actions/index.js';


import App from './components/App.jsx';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';

// import cookies from 'js-cookie';
// import io from 'socket.io-client';
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
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

// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './App.jsx';

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

ReactDOM.render(
  <App channels={gon.channels}/>,
  document.getElementById('chat'),
);

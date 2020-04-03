// @ts-check

import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const App = () => {
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <Chat />
    </div>
  );
};

export default App;

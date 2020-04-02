// @ts-check

import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

export default class App extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <div className="row h-100 pb-3">
        <Channels />
        <Chat />
      </div>
    );
  }
}

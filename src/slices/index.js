// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels, { actions as channelActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import channelsUI, { actions as channelsUIActions } from './channelsUIState';

import createMessageStatus, { actions as createMessageActions, createMessage } from './createMessageStatus';
import createChannelStatus, { actions as createChannelActions, createChannel } from './createChannelStatus';
import removeChannelStatus, { actions as removeChannelActions, removeChannel } from './removeChannelStatus';
import renameChannelStatus, { actions as renameChannelActions, renameChannel } from './renameChannelStatus';

export default combineReducers({
  channels,
  messages,
  channelsUI,
  createMessageStatus,
  createChannelStatus,
  removeChannelStatus,
  renameChannelStatus,
});

const actions = {
  ...channelActions,
  ...messagesActions,
  ...channelsUIActions,
  ...createMessageActions,
  ...createChannelActions,
  ...removeChannelActions,
  ...renameChannelActions,
};

const asyncActions = {
  createMessage,
  createChannel,
  removeChannel,
  renameChannel,
};

export {
  actions,
  asyncActions,
};

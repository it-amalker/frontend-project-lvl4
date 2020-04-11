// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels, { actions as channelActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import modalInfo, { actions as modalInfoActions } from './modalInfo';

import createChannelStatus, { actions as createChannelActions, createChannel } from './createChannelStatus';
import removeChannelStatus, { actions as removeChannelActions, removeChannel } from './removeChannelStatus';
import renameChannelStatus, { actions as renameChannelActions, renameChannel } from './renameChannelStatus';

export default combineReducers({
  channels,
  messages,
  modalInfo,
  createChannelStatus,
  removeChannelStatus,
  renameChannelStatus,
});

const actions = {
  ...channelActions,
  ...messagesActions,
  ...modalInfoActions,
  ...createChannelActions,
  ...removeChannelActions,
  ...renameChannelActions,
};

const asyncActions = {
  createChannel,
  removeChannel,
  renameChannel,
};

export {
  actions,
  asyncActions,
};

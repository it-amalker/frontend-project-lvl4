// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels, { actions as channelActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import modalInfo, { actions as modalInfoActions } from './modalInfo';

import createMessageStatus, { actions as createMessageActions, createMessage } from './createMessageStatus';
import createChannelStatus, { actions as createChannelActions, createChannel } from './createChannelStatus';
import removeChannelStatus, { actions as removeChannelActions, removeChannel } from './removeChannelStatus';
import renameChannelStatus, { actions as renameChannelActions, renameChannel } from './renameChannelStatus';

export default combineReducers({
  channels,
  messages,
  modalInfo,
  createMessageStatus,
  createChannelStatus,
  removeChannelStatus,
  renameChannelStatus,
});

const actions = {
  ...channelActions,
  ...messagesActions,
  ...modalInfoActions,
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

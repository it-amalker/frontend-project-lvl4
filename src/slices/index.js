// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels, { actions as channelActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import modalInfo, { actions as modalInfoActions } from './modalInfo';

export default combineReducers({
  channels,
  messages,
  modalInfo,
});

const actions = {
  ...channelActions,
  ...messagesActions,
  ...modalInfoActions,
};

export {
  actions,
};

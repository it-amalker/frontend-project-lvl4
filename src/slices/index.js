// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels, { actions as channelActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import modalInfo, { actions as modalInfoActions } from './modalInfo';
import removeStatus, { actions as removeStatusActions } from './removeStatus';

export default combineReducers({
  channels,
  messages,
  modalInfo,
  removeStatus,
});

const actions = {
  ...channelActions,
  ...messagesActions,
  ...modalInfoActions,
  ...removeStatusActions,
};

export {
  actions,
};

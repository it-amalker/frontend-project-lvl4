import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const messageCreateState = handleActions({
  [actions.createMessageRequest]() {
    return 'requested';
  },
  [actions.createMessageFailure]() {
    return 'failed';
  },
  [actions.createMessageSuccess]() {
    return 'finished';
  },
  [actions.resetCreateMessageStatus]() {
    return 'none';
  },
}, 'none');

const channelCreateState = handleActions({
  [actions.createChannelRequest]() {
    return 'requested';
  },
  [actions.createChannelFailure]() {
    return 'failed';
  },
  [actions.createChannelSuccess]() {
    return 'finished';
  },
  [actions.resetCreateChannelStatus]() {
    return 'none';
  },
}, 'none');

const channelRemoveState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
  [actions.resetRemoveChannelStatus]() {
    return 'none';
  },
}, 'none');

const messages = handleActions({
  [actions.initAppState](state, { payload: { gon } }) {
    return {
      messages: gon.messages,
    };
  },
  [actions.createMessageSuccess](state, { payload: { message } }) {
    return {
      messages: [...state.messages, message.attributes],
    };
  },
}, { messages: [] });

const channels = handleActions({
  [actions.initAppState](state, { payload: { gon } }) {
    return {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    };
  },
  [actions.createChannelSuccess](state, { payload: { channel } }) {
    return {
      ...state,
      channels: [...state.channels, channel.attributes],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    console.log('id ', id);
    const newChannels = state.channels.filter((c) => c.id !== id);
    console.log('newChannels ', newChannels);
    return {
      channels: newChannels,
      currentChannelId: 1,
    };
  },
  [actions.switchChannel](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, { channels: [], currentChannelId: 1 });

const channelsUI = handleActions({
  [actions.newChannelModalShow](state, { payload: { modalShow } }) {
    return {
      ...state,
      addNewChannelShow: modalShow, 
    };
  },
  [actions.modalShowOnRemoveChannel](state, { payload: { modalShow, removableId } }) {
    console.log('modalShow ', modalShow, 'removableId ', removableId);
    return {
      ...state,
      removeChannelShow: { show: modalShow, removableId }, 
    };
  },
}, { addNewChannelShow: false, removeChannelShow: { show: false, removableId: null } });

export default combineReducers({
  channels,
  messages,
  channelsUI,
  messageCreateState,
  channelCreateState,
  channelRemoveState,
});
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
}, 'none');

const messages = handleActions({
  [actions.initStateSuccess](state, { payload: { gon } }) {
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
  [actions.initStateSuccess](state, { payload: { gon } }) {
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
  [actions.getChannelsSuccess](state, { payload: { data } }) {
    const channels = data.map(({ attributes }) => ({ ...attributes }));
    return {
      channels,
    };
  },
  [actions.switchChannelsSuccess](state, { payload: { id } }) {
    return {
      ...state,
      currentChannelId: id,
    };
  },
}, { channels: [], currentChannelId: 1 });

const channelsUI = handleActions({
  [actions.newChannelModalShow](state, { payload: { modalShow } }) {
    console.log('modalShow ', modalShow)
    return {
      ...state,
      addNewChannelShow: modalShow, 
    };
  },
}, { addNewChannelShow: false });

export default combineReducers({
  channels,
  messages,
  channelsUI,
  messageCreateState,
  channelCreateState,
});
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';

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

export default combineReducers({
  channels,
  messages,
});
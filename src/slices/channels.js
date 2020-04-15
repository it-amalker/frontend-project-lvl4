// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    initState: (state, { payload: { channels, currentChannelId } }) => {
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    createChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel.attributes);
    },
    removeChannel: (state, { payload: { id } }) => {
      const defaultCurrentChannelId = 1;
      state.channels = state.channels.filter((c) => c.id !== id);
      state.currentChannelId = defaultCurrentChannelId;
    },
    renameChannel: (state, { payload: { channel } }) => {
      state.channels = state.channels.map((c) => (c.id === channel.id ? channel : c));
    },
    switchChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

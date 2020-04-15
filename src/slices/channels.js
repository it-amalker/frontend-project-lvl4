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
      const newChannels = state.channels.filter((c) => c.id !== id);
      state.channels = newChannels;
      state.currentChannelId = defaultCurrentChannelId;
    },
    renameChannel: (state, { payload: { channel } }) => {
      const updatedChannels = state.channels.map((c) => (c.id === channel.id ? channel : c));
      state.channels = updatedChannels;
    },
    switchChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

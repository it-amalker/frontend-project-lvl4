// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    initMessagesState: (state, { payload: { messages } }) => {
      state.messages = messages;
    },
    updateMessages: (state, { payload: { message } }) => {
      state.messages = [...state.messages, message.attributes];
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { actions as cnannelActions } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    createMessage: (state, { payload: { message } }) => {
      state.messages.push(message.attributes);
    },
  },
  extraReducers: {
    // @ts-ignore
    [cnannelActions.initState]: (state, { payload: { messages } }) => {
      state.messages = messages;
    },
    // @ts-ignore
    [cnannelActions.removeChannel]: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((m) => m.id !== id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

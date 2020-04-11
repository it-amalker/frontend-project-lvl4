// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: {
    type: null,
    channelInfo: null,
  },
  reducers: {
    setModalInfo: (state, { payload: { type, channelInfo } }) => {
      state.type = type;
      state.channelInfo = channelInfo;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

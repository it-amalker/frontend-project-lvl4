// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsUIState',
  initialState: {
    createChannel: {
      shown: false,
    },
    removeChannel: {
      shown: false,
      removableId: null,
    },
    renameChannel: {
      shown: false,
      renameId: null,
      prevName: '',
    },
  },
  reducers: {
    modalShowOnCreateChannel: ({ createChannel }, { payload: { show } }) => {
      createChannel.shown = show;
    },
    modalShowOnRemoveChannel: ({ removeChannel }, { payload: { show, removableId } }) => {
      removeChannel.shown = show;
      removeChannel.removableId = removableId;
    },
    modalShowOnRenameChannel: ({ renameChannel }, { payload: { show, renameId, prevName } }) => {
      renameChannel.shown = show;
      renameChannel.renameId = renameId;
      renameChannel.prevName = prevName;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

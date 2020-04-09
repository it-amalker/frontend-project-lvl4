// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'removeChannelStatus',
  initialState: {
    type: 'remove',
    status: 'none',
    info: 'Manage channels',
    isProcessing: false,
  },
  reducers: {
    removeChannelRequest(state) {
      state.status = 'requested';
      state.info = 'Processing...';
      state.isProcessing = true;
    },
    removeChannelSuccess(state) {
      state.status = 'finished';
      state.info = 'Channel removed';
      state.isProcessing = true;
    },
    removeChannelFailure(state) {
      state.status = 'failed';
      state.info = 'Probably network problems, check network connection';
      state.isProcessing = true;
    },
    resetRemoveChannelStatus(state) {
      state.status = 'none';
      state.info = 'Manage channels';
      state.isProcessing = false;
    },
  },
});

const { removeChannelRequest, removeChannelSuccess, removeChannelFailure } = slice.actions;

const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
    dispatch(removeChannelSuccess());
  } catch (e) {
    dispatch(removeChannelFailure());
    throw new Error(`Cannot remove channel, probably network problems: ${e}`);
  }
};

const actions = { ...slice.actions };
export { actions, removeChannel };
export default slice.reducer;

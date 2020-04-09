// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'renameChannelStatus',
  initialState: {
    type: 'rename',
    status: 'none',
    info: 'Manage channels',
    isProcessing: false,
  },
  reducers: {
    renameChannelRequest(state) {
      state.status = 'requested';
      state.info = 'Processing...';
      state.isProcessing = true;
    },
    renameChannelSuccess(state) {
      state.status = 'finished';
      state.info = 'Channel renamed';
      state.isProcessing = true;
    },
    renameChannelFailure(state) {
      state.status = 'failed';
      state.info = 'Probably network problems, check network connection';
      state.isProcessing = true;
    },
    resetRenameChannelStatus(state) {
      state.status = 'none';
      state.info = 'Manage channels';
      state.isProcessing = false;
    },
  },
});

const { renameChannelRequest, renameChannelSuccess, renameChannelFailure } = slice.actions;

const renameChannel = ({ id, name }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.channelPath(id);
    await axios.patch(url, { data: { attributes: { name } } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    dispatch(renameChannelFailure());
    throw new Error(`Cannot rename channel, probably network problems: ${e}`);
  }
};

const actions = { ...slice.actions };
export { actions, renameChannel };
export default slice.reducer;

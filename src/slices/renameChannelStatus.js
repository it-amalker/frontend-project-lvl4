// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'renameChannelStatus',
  initialState: {
    status: 'none',
    text: 'Manage channels',
  },
  reducers: {
    renameChannelRequest(state) {
      state.status = 'requested';
      state.text = 'Processing...';
    },
    renameChannelSuccess(state) {
      state.status = 'finished';
      state.text = 'Channel renamed';
    },
    renameChannelFailure(state) {
      state.status = 'failed';
      state.text = 'Probably network problems, check network connection';
    },
    resetRenameChannelStatus(state) {
      state.status = 'none';
      state.text = 'Manage channels';
    },
  },
});

const { renameChannelRequest, renameChannelSuccess, renameChannelFailure } = slice.actions;

const renameChannel = () => {
  const dispatch = useDispatch();
  const rename = async ({ id, name }) => {
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

  return {
    rename,
  };
};

const actions = { ...slice.actions };
export { actions, renameChannel };
export default slice.reducer;

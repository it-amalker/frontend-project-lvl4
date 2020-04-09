// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'createChannelStatus',
  initialState: {
    type: 'create',
    status: 'none',
    info: 'Manage channels',
    isProcessing: false,
  },
  reducers: {
    createChannelRequest(state) {
      state.status = 'requested';
      state.info = 'Processing...';
      state.isProcessing = true;
    },
    createChannelSuccess(state) {
      state.status = 'finished';
      state.info = 'Channel added';
      state.isProcessing = true;
    },
    createChannelFailure(state) {
      state.status = 'failed';
      state.info = 'Probably network problems, check network connection';
      state.isProcessing = true;
    },
    resetCreateChannelStatus(state) {
      state.status = 'none';
      state.info = 'Manage channels';
      state.isProcessing = false;
    },
  },
});

const { createChannelRequest, createChannelSuccess, createChannelFailure } = slice.actions;

const createChannel = () => {
  const dispatch = useDispatch();
  const create = async ({ name }) => {
    dispatch(createChannelRequest());
    try {
      const url = routes.channelsPath();
      await axios.post(url, { data: { attributes: { name } } });
      dispatch(createChannelSuccess());
    } catch (e) {
      dispatch(createChannelFailure());
      throw new Error(`Cannot create new channel, probably network problems: ${e}`);
    }
  };

  return {
    create,
  };
};

const actions = { ...slice.actions };
export { actions, createChannel };
export default slice.reducer;

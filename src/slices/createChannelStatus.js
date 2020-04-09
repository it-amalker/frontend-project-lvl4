// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'createChannelStatus',
  initialState: {
    status: 'none',
    text: 'Manage channels',
  },
  reducers: {
    createChannelRequest(state) {
      state.status = 'requested';
      state.text = 'Processing...';
    },
    createChannelSuccess(state) {
      state.status = 'finished';
      state.text = 'Channel added';
    },
    createChannelFailure(state) {
      state.status = 'failed';
      state.text = 'Probably network problems, check network connection';
    },
    resetCreateChannelStatus(state) {
      state.status = 'none';
      state.text = 'Manage channels';
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

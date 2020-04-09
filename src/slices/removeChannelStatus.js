// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'removeChannelStatus',
  initialState: {
    status: 'none',
    text: 'Manage channels',
  },
  reducers: {
    removeChannelRequest(state) {
      state.status = 'requested';
      state.text = 'Processing...';
    },
    removeChannelSuccess(state) {
      state.status = 'finished';
      state.text = 'Channel removed';
    },
    removeChannelFailure(state) {
      state.status = 'failed';
      state.text = 'Probably network problems, check network connection';
    },
    resetRemoveChannelStatus(state) {
      state.status = 'none';
      state.text = 'Manage channels';
    },
  },
});

const { removeChannelRequest, removeChannelSuccess, removeChannelFailure } = slice.actions;

const removeChannel = () => {
  const dispatch = useDispatch();
  const remove = async ({ id }) => {
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

  return {
    remove,
  };
};

const actions = { ...slice.actions };
export { actions, removeChannel };
export default slice.reducer;

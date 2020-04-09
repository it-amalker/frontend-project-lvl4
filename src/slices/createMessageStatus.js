// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'createMessageStatus',
  initialState: {
    status: 'none',
    text: 'Start chatting',
  },
  reducers: {
    createMessageRequest(state) {
      state.status = 'requested';
      state.text = 'Sending...';
    },
    createMessageSuccess(state) {
      state.status = 'finished';
      state.text = 'Message sent';
    },
    createMessageFailure(state) {
      state.status = 'failed';
      state.text = 'Probably network problems, check network connection';
    },
    resetCreateMessageStatus(state) {
      state.status = 'none';
      state.text = 'Start chatting';
    },
  },
});

const { createMessageRequest, createMessageSuccess, createMessageFailure } = slice.actions;

const createMessage = () => {
  const dispatch = useDispatch();
  const create = async ({ text, author, currentChannelId }) => {
    dispatch(createMessageRequest());
    try {
      const url = routes.channelMessagesPath(currentChannelId);
      await axios.post(url, { data: { attributes: { text, author } } });
      dispatch(createMessageSuccess());
    } catch (e) {
      dispatch(createMessageFailure());
      throw new Error(`Cannot create new message, probably network problems: ${e}`);
    }
  };

  return {
    create,
  };
};

const actions = { ...slice.actions };
export { actions, createMessage };
export default slice.reducer;

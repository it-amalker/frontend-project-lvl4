import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const initStateSuccess = createAction('STATE_INIT');

export const newChannelModalShow = createAction('CHANNEL_MODAL_SHOW');

export const createMessageRequest = createAction('MESSAGE_CREATE_REQUEST');
export const createMessageSuccess = createAction('MESSAGE_CREATE_SUCCESS');
export const createMessageFailure = createAction('MESSAGE_CREATE_FAILURE');

export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');

export const getChannelsSuccess = createAction('CHANNELS_GET_SUCCESS');
export const switchChannelsSuccess = createAction('CHANNELS_SWITCH_SUCCESS');

export const createMessage = ({ text, author, currentChannelId }) => async (dispatch) => {
  dispatch(createMessageRequest());
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    await axios.post(url, { data: { attributes: { text, author } } });
  } catch (e) {
    dispatch(createMessageFailure());
    throw new Error(`Cannot create new message, probably network problems: ${e}`);
  }
};

export const createChannel = ({ name }) => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes: { name } } });
  } catch (e) {
    dispatch(createChannelFailure());
    throw new Error(`Cannot add new channel, probably network problems: ${e}`);
  }
  
};

export const getChannels = () => async (dispatch) => {
  const url = routes.channelsPath();
  const response = await axios.get(url);
  dispatch(getChannelsSuccess({ data: response.data.data }));
};

export const initState = (gon) => (dispatch) => {
  dispatch(initStateSuccess({ gon }));
};
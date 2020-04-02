import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const createMessageSuccess = createAction('MESSAGE_CREATE_SUCCESS');

export const initStateSuccess = createAction('STATE_INIT');

export const getChannelsSuccess = createAction('CHANNELS_GET_SUCCESS');

export const createMessage = ({ text, currentChannelId }) => async (dispatch) => {
  const url = routes.channelMessagesPath(currentChannelId);
  const response = await axios.post(url, { data: { attributes: { text } } });
  dispatch(createMessageSuccess({ message: response.data.data }));
};

export const getChannels = () => async (dispatch) => {
  const url = routes.channelsPath();
  const response = await axios.get(url);
  dispatch(getChannelsSuccess({ data: response.data.data }));
};

export const initState = (gon) => (dispatch) => {
  dispatch(initStateSuccess({ gon }));
};
// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { resetCreateChannelStatus } from '../actions/index.js';
import setResetDelay from '../utils.js';

const ChannelsStatus = ({ messagesLength }) => {
  // @ts-ignore
  const channelsCreateState = useSelector(({ channelCreateState }) => channelCreateState);

  const dispatch = useDispatch();

  const statusByChannelsState = {
    none: () => (
      <Badge variant="secondary">Manage channels</Badge>
    ),
    requested: () => (
      <Badge variant="primary">Processing...</Badge>
    ),
    finished: () => {
      setResetDelay(() => dispatch(resetCreateChannelStatus()), 2500);
      return (
        <Badge variant="success">Channel added</Badge>
      );
    },
    failed: () => {
      setResetDelay(() => dispatch(resetCreateChannelStatus()), 3500);
      return (
        <Badge variant="danger">Probably network problems, check network connection</Badge>
      );
    },
  };

  return (
    <div>
      <span className="small">
        <b>Channels: </b>
        <Badge variant="secondary">{messagesLength}</Badge>{' '}
      </span>
      <span className="small">
        <b>Status: </b> 
        {statusByChannelsState[channelsCreateState]()}
      </span>
    </div>
  );
};

export default ChannelsStatus;

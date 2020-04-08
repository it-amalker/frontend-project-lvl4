// @ts-check

import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { resetCreateChannelStatus, resetRemoveChannelStatus, resetRenameChannelStatus } from '../actions/index';
import setResetDelay from '../utils';

const ChannelsStatus = ({ messagesLength }) => {
  const {
    // @ts-ignore
    channelCreateState,
    // @ts-ignore
    channelRemoveState,
    // @ts-ignore
    channelRenameState,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const sharedStatusesByChannelsState = {
    finished: ({ reset, status }) => {
      setResetDelay(() => dispatch(reset()), 2500);
      return (
        <Badge variant="success">{status}</Badge>
      );
    },
    failed: ({ reset }) => {
      setResetDelay(() => dispatch(reset()), 3500);
      return (
        <Badge variant="danger">Probably network problems, check network connection</Badge>
      );
    },
  };

  const statusByChannelsState = {
    none: () => null,
    requested: () => (
      <Badge variant="primary">Processing...</Badge>
    ),
    ...sharedStatusesByChannelsState,
  };

  return (
    <div>
      <span className="small">
        <b>Channels: </b>
        <Badge variant="secondary">{messagesLength}</Badge>
        {' '}
      </span>
      <span className="small">
        <b>Status: </b>
        {statusByChannelsState[channelCreateState]({ reset: resetCreateChannelStatus, status: 'Channel added' })
        || statusByChannelsState[channelRemoveState]({ reset: resetRemoveChannelStatus, status: 'Channel removed' })
        || statusByChannelsState[channelRenameState]({ reset: resetRenameChannelStatus, status: 'Channel renamed' })
        || <Badge variant="secondary">Manage channels</Badge>}
      </span>
    </div>
  );
};

export default ChannelsStatus;

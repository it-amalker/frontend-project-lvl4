// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { actions } from '../slices';
import setResetDelay from '../utils';

const ChannelsStatus = ({ messagesLength }) => {
  const { resetCreateChannelStatus, resetRemoveChannelStatus, resetRenameChannelStatus } = actions;
  const {
    // @ts-ignore
    createChannelStatus,
    // @ts-ignore
    removeChannelStatus,
    // @ts-ignore
    renameChannelStatus,
  } = useSelector((state) => state);

  const { status: createStatus, text: createText } = createChannelStatus;
  const { status: removeStatus, text: removeText } = removeChannelStatus;
  const { status: renameStatus, text: renameText } = renameChannelStatus;

  const dispatch = useDispatch();

  const sharedStatuses = {
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

  const statuses = {
    none: () => null,
    requested: () => (
      <Badge variant="primary">Processing...</Badge>
    ),
    ...sharedStatuses,
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
        {statuses[createStatus]({ reset: resetCreateChannelStatus, status: createText })
        || statuses[removeStatus]({ reset: resetRemoveChannelStatus, status: removeText })
        || statuses[renameStatus]({ reset: resetRenameChannelStatus, status: renameText })
        || <Badge variant="secondary">Manage channels</Badge>}
      </span>
    </div>
  );
};

export default ChannelsStatus;

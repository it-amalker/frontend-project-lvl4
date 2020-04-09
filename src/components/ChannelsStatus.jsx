// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { actions } from '../slices';
import { setResetDelay } from '../utils';

const ChannelsStatus = ({ messagesLength }) => {
  const {
    // @ts-ignore
    createChannelStatus,
    // @ts-ignore
    removeChannelStatus,
    // @ts-ignore
    renameChannelStatus,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const statuses = {
    none: () => null,
    requested: ({ info }) => (
      <Badge variant="primary">{info}</Badge>
    ),
    finished: ({ reset, info }) => {
      setResetDelay(() => dispatch(reset()), 2500);
      return (
        <Badge variant="success">{info}</Badge>
      );
    },
    failed: ({ reset, info }) => {
      setResetDelay(() => dispatch(reset()), 3500);
      return (
        <Badge variant="danger">{info}</Badge>
      );
    },
  };

  const resetTypes = {
    create: actions.resetCreateChannelStatus,
    remove: actions.resetRemoveChannelStatus,
    rename: actions.resetRenameChannelStatus,
  };

  const getStatusInfo = ({
    type,
    status,
    info,
    isProcessing,
  }) => {
    const reset = resetTypes[type];
    return isProcessing ? statuses[status]({ reset, info }) : null;
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
        {getStatusInfo(createChannelStatus)
        || getStatusInfo(removeChannelStatus)
        || getStatusInfo(renameChannelStatus)
        || <Badge variant="secondary">Manage channels</Badge>}
      </span>
    </div>
  );
};

export default ChannelsStatus;

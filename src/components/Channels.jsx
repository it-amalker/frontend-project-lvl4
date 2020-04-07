// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import * as actions from '../actions/index';
import socket from '../socket';
import ModalCreate from './ModalCreateChannel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalRenameChannel';
import ChannelsStatus from './ChannelsStatus';

const Channels = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const switchChannel = (id) => () => {
    dispatch(actions.switchChannel({ id }));
  };

  const onRemove = (id) => () => {
    dispatch(actions.modalShowOnRemoveChannel({ modalShow: true, removableId: id }));
  };

  const onRename = (id, name) => () => {
    dispatch(actions.modalShowOnRenameChannel({ modalShow: true, renameId: id, prevName: name }));
  };

  useEffect(() => {
    socket.on('newChannel', ({ data }) => {
      dispatch(actions.createChannelSuccess({ channel: data }));
    });
  }, []);

  useEffect(() => {
    socket.on('removeChannel', ({ data: { id } }) => {
      dispatch(actions.removeChannelSuccess({ id }));
    });
  }, []);

  useEffect(() => {
    socket.on('renameChannel', ({ data: { attributes } }) => {
      dispatch(actions.renameChannelSuccess({ channel: attributes }));
    });
  }, []);

  const renderChannels = () => (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ name, id, removable }) => {
        const isActive = id === currentChannelId;
        const btnClasses = cn({
          'btn-block': true,
          active: isActive,
        });
        return (
          <li key={id} className="nav-item mb-1">
            <ButtonGroup className="btn-block">
              <Button
                style={{ zIndex: 2 }}
                className={btnClasses}
                variant="light"
                onClick={switchChannel(id)}
              >
                {isActive ? <b>{name}</b> : `${name}`}
              </Button>
              <Button
                disabled={!removable}
                variant="secondary"
                onClick={onRename(id, name)}
              >
                {'\u270E'}
              </Button>
              <Button
                disabled={!removable}
                variant="secondary"
                onClick={onRemove(id)}
              >
                -
              </Button>
            </ButtonGroup>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="col-3 border-right h-100 overflow-auto">
      <div className="d-flex align-items-center">
        <span>Channels</span>
        <ModalCreate />
      </div>
      <div className="d-flex my-2 py-1 border-bottom border-top">
        <ChannelsStatus messagesLength={channels.length} />
      </div>
      {renderChannels()}
      {<ModalRemove />}
      {<ModalRename />}
    </div>
  );
};

export default Channels;

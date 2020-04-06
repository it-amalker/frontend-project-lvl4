// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import * as actions from '../actions/index.js';
import socket from '../socket.js';
import cn from 'classnames';
import Modal from './ModalCreateChannel.jsx';
import ModalRemove from './ModalRemoveChannel.jsx';
import ChannelsStatus from './ChannelsStatus.jsx';

const Channels = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  const { channels, currentChannelId } = channelsState;
  const dispatch = useDispatch();

  const switchChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(actions.switchChannel({ id }));
  };

  const onRemove = (id) => () => {
    dispatch(actions.modalShowOnRemoveChannel({ modalShow: true, removableId: id }));
  };

  useEffect(() => {
    socket.on('newChannel', ({ data }) => {
      dispatch(actions.createChannelSuccess({ channel: data }));
    });
  }, []);

  useEffect(() => {
    socket.on('removeChannel', ({ data: { id } }) => {
      console.log('id ', id);
      dispatch(actions.removeChannelSuccess({ id }));
    });
  }, []);

  return (
    <div className="col-3 border-right">
      {<ModalRemove />}
      <div className="d-flex align-items-center">
        <span>Channels</span>
        {<Modal />}
      </div>
      <div className="d-flex mb-2 mt-2 pb-1 pt-1 border-bottom border-top">
        {<ChannelsStatus messagesLength={channels.length} />}
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ name, id, removable}) => {
          const isActive = id === currentChannelId;
          const btnClasses = cn({
            'btn-block': true,
            active: isActive,
          });
          return (
            <li key={id} className="nav-item mb-1">
              <ButtonGroup className="btn-block">
                <Button
                  style={{zIndex: 2}}
                  className={btnClasses}
                  variant="light"
                  onClick={switchChannel(id)}
                >
                  {name}
                </Button>
                <Button
                  disabled={!removable}
                  className="overflow-auto" 
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
    </div>
  );
};

export default Channels;

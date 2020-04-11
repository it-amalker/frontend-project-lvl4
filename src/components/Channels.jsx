// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import io from 'socket.io-client';
import { actions } from '../slices';
import ChannelsStatus from './ChannelsStatus';
import getModal from './modals';

const socket = io();

const Channels = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  // @ts-ignore
  const modalInfo = useSelector((state) => state.modalInfo);

  const switchChannel = (id) => () => {
    dispatch(actions.switchChannel({ id }));
  };

  const showModal = (type, channelInfo = null) => (
    dispatch(actions.setModalInfo({ type, channelInfo }))
  );

  const hideModal = () => (
    dispatch(actions.setModalInfo({ type: null, channelInfo: null }))
  );

  useEffect(() => {
    socket.on('newChannel', ({ data }) => {
      dispatch(actions.createChannel({ channel: data }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('removeChannel', ({ data: { id } }) => {
      dispatch(actions.removeChannel({ id }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('renameChannel', ({ data: { attributes } }) => {
      dispatch(actions.renameChannel({ channel: attributes }));
    });
  }, [dispatch]);

  const renderModal = ({ type, channelInfo }) => {
    if (!type) {
      return null;
    }

    const Modal = getModal(type);
    return <Modal channelInfo={channelInfo} onHide={hideModal} />;
  };

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
                onClick={() => showModal('renaming', { id, prevName: name })}
              >
                ...
              </Button>
              <Button
                disabled={!removable}
                variant="secondary"
                onClick={() => showModal('removing', { id })}
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
        <Button className="ml-auto btn-sm" variant="success" onClick={() => showModal('creating')}>
          <b>+</b>
        </Button>
      </div>
      <div className="d-flex my-2 py-1 border-bottom border-top">
        <ChannelsStatus messagesLength={channels.length} />
      </div>
      {renderChannels()}
      {renderModal(modalInfo)}
    </div>
  );
};

export default Channels;

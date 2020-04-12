// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Badge } from 'react-bootstrap';
import cn from 'classnames';
import { actions } from '../slices';
import getModal from './modals';

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

  const setSelected = (el) => () => setTimeout(() => el.current.select(), 200);

  const renderModal = ({ type, channelInfo }) => {
    if (!type) {
      return null;
    }

    const Modal = getModal(type);
    return <Modal channelInfo={channelInfo} onHide={hideModal} setSelected={setSelected} />;
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
      <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
        <span>
          <b>Channels: </b>
          <Badge variant="secondary">{channels.length}</Badge>
        </span>
        <Button className="ml-auto btn-sm" variant="success" onClick={() => showModal('creating')}>
          <b>+</b>
        </Button>
      </div>
      {renderChannels()}
      {renderModal(modalInfo)}
    </div>
  );
};

export default Channels;

// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index.js';
import cn from 'classnames';
import Modal from './ModalAddChannel.jsx';

const Channels = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  const { channels, currentChannelId } = channelsState;
  const dispatch = useDispatch();

  const switchChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(actions.switchChannelsSuccess({ id }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2 align-items-center">
        <span>Channels</span>
        {<Modal />}
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ name, id}) => {
          const isActive = id === currentChannelId;
          const btnClasses = cn({
            'nav-link': true,
            btn: true,
            'btn-block': true,
            active: isActive,
          });
          return (
            <li key={id} className="nav-item">
              <button className={btnClasses} type="button" onClick={switchChannel(id)}>{name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;

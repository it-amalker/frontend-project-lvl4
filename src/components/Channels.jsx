// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const Channels = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  const { channels, currentChannelId } = channelsState;

  if (channels.length === 0) {
    return null;
  }

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
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
              <button className={btnClasses} type="button">{name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;

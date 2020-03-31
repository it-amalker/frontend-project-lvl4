// @ts-check

import React from 'react';

export default class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    if (channels.length === 0) {
      return null;
    }
    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels.map(({ name, id}) => (
            <li key={id} className="nav-item">
              <button className="nav-link btn btn-block" type="button">{name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

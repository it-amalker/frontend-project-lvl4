// @ts-check

import React from 'react';

export default class Chat extends React.Component {
  render() {
    return (
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div className="messages-block overflow-auto mb-3" />
          <div className="mt-auto">
            <form>
              <input className="form-control" name="body" type="text" value="" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

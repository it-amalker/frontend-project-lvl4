// @ts-check

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { modalShowOnRemoveChannel, removeChannel } from '../actions/index.js';

const modalRemoveChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const channelStateUI = useSelector((state) => state.channelsUI);
  const { show, removableId: id } = channelStateUI.removeChannelShow;

  const handleClose = () => dispatch(modalShowOnRemoveChannel({ modalShow: false }));

  const handleRemoveChannel = () => {
    dispatch(removeChannel({ id }));
    handleClose();
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Channel will be removed permanently.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="success" type="submit" onClick={handleRemoveChannel}>
            Confirm
          </Button>{' '}
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default modalRemoveChannel;

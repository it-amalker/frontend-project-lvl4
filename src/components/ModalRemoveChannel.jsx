// @ts-check

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { modalShowOnRemoveChannel, removeChannel } from '../actions/index';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { show, removableId: id } = useSelector((state) => state.channelsUI.removeChannelShow);

  const handleClose = () => (
    dispatch(modalShowOnRemoveChannel({ modalShow: false, removableId: null }))
  );

  const handleRemoveChannel = () => {
    dispatch(removeChannel({ id }));
    handleClose();
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Channel will be removed permanently</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ml-auto">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          {' '}
          <Button variant="danger" type="submit" onClick={handleRemoveChannel}>
            Remove
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRemoveChannel;

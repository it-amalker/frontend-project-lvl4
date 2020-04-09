// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { actions, asyncActions } from '../slices';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { shown, removableId: id } = useSelector((state) => state.channelsUI.removeChannel);
  const { remove: removeChannel } = asyncActions.removeChannel();

  const handleClose = () => (
    dispatch(actions.modalShowOnRemoveChannel({ show: false, removableId: null }))
  );

  const handleRemoveChannel = () => {
    removeChannel({ id });
    handleClose();
  };

  return (
    <>
      <Modal centered show={shown} onHide={handleClose}>
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

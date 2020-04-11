// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { asyncActions } from '../../slices';

const ModalRemoveChannel = ({ channelInfo, onHide }) => {
  const dispatch = useDispatch();

  const { removeChannel } = asyncActions;
  const { id } = channelInfo;

  const onRemove = () => {
    dispatch(removeChannel({ id }));
    onHide();
  };

  return (
    <>
      <Modal centered show onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Channel will be removed permanently</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ml-auto">
          <Button variant="secondary" type="button" onClick={onHide}>
            Cancel
          </Button>
          {' '}
          <Button variant="danger" type="submit" onClick={onRemove}>
            Remove
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRemoveChannel;

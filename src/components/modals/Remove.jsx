// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../routes';
import { actions } from '../../slices';

const ModalRemoveChannel = ({ channelInfo, onHide }) => {
  const dispatch = useDispatch();

  const { id } = channelInfo;

  // @ts-ignore
  const { errors } = useSelector((state) => state.removeStatus);

  const onRemove = async () => {
    try {
      const url = routes.channelPath(id);
      await axios.delete(url);
      dispatch(actions.resetErrors());
      onHide();
    } catch (e) {
      dispatch(actions.setError({ networkError: e }));
      throw new Error(`Failed to remove channel, probably network problems: ${e}`);
    }
  };

  return (
    <>
      <Modal centered show onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Channel will be removed permanently</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ml-auto">
          {errors.length > 0 ? <span className="text-danger mr-2">Network problems</span> : null}
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

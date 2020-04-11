// @ts-check

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { asyncActions } from '../../slices';
import { setSelected } from '../../utils';

const ModalRenameChannel = ({ channelInfo, onHide }) => {
  const dispatch = useDispatch();

  const { renameChannel } = asyncActions;
  const { id, prevName } = channelInfo;

  const modalInput = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: prevName,
    },
    onSubmit: ({ name }) => {
      dispatch(renameChannel({ id, name }));
      onHide();
    },
  });

  return (
    <>
      <Modal centered show onHide={onHide} onEnter={setSelected(modalInput)} size="sm">
        <Modal.Header closeButton className="pb-2">
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New channel name:</Form.Label>
              <Form.Control
                required
                ref={modalInput}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button block variant="primary" type="submit">
              Rename
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRenameChannel;

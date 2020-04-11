// @ts-check

import React, { useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { asyncActions } from '../../slices';
import { setSelected } from '../../utils';


const ModalCreateChannel = ({ onHide }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { createChannel } = asyncActions;

  const modalInput = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: 'New Channel',
    },
    onSubmit: ({ name }) => {
      dispatch(createChannel({ name }));
      onHide();
    },
  });

  return (
    <>
      <Modal centered show onHide={onHide} onEnter={setSelected(modalInput)} size="sm">
        <Modal.Header closeButton className="pb-2">
          <Modal.Title>Create new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Channel name:</Form.Label>
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
              Add new channel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateChannel;

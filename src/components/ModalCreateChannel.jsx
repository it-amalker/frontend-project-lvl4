// @ts-check

import React, { useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import * as actions from '../actions/index';
import { actions, asyncActions } from '../slices';


const ModalCreateChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { shown } = useSelector((state) => state.channelsUI.createChannel);
  const { create: createChannel } = asyncActions.createChannel();

  const formControlEl = useRef(null);

  const handleClose = () => dispatch(actions.modalShowOnCreateChannel({ show: false }));
  const handleShow = () => {
    dispatch(actions.modalShowOnCreateChannel({ show: true }));
    setTimeout(() => formControlEl.current.select(), 200);
  };

  const formik = useFormik({
    initialValues: {
      text: 'New Channel',
    },
    onSubmit: ({ text: name }, { resetForm }) => {
      createChannel({ name });
      resetForm();
    },
  });

  return (
    <>
      <Button className="ml-auto btn-sm" variant="success" onClick={handleShow}>
        <b>+</b>
      </Button>
      <Modal centered show={shown} onHide={handleClose} size="sm">
        <Modal.Header closeButton className="pb-2">
          <Modal.Title>Create new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Channel name:</Form.Label>
              <Form.Control
                ref={formControlEl}
                type="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button block variant="primary" type="submit" onClick={handleClose}>
              Add new channel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateChannel;

// @ts-check

import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../actions/index.js';
import { useFormik } from 'formik';
import socket from '../socket.js';

const modalAddChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const channelStateUI = useSelector((state) => state.channelsUI);
  const { addNewChannelShow: show } = channelStateUI;

  const formControlEl = useRef(null);

  const handleClose = () => dispatch(actions.newChannelModalShow({ modalShow: false }));
  const handleShow = () => {
    dispatch(actions.newChannelModalShow({ modalShow: true }));
    setTimeout(()=> formControlEl.current.focus(), 200);
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text: name }, { resetForm }) => {
      dispatch(actions.createChannel({ name }));
      resetForm();
    },
  });

  useEffect(() => {
    socket.on('newChannel', ({ data }) => {
      dispatch(actions.createChannelSuccess({ channel: data }));
    });
  }, []);

  return (
    <>
      <Button className="ml-auto btn-sm" variant="success" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
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
            <Button type="submit" onClick={handleClose}>
              Add new channel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default modalAddChannel;

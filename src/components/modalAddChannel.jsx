// @ts-check

import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as actions from '../actions/index.js';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';

const modalAddChannel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      console.log('text ', text);
      resetForm();
    },
  });

  return (
    <>
      <button className="btn btn-success ml-auto btn-sm" onClick={handleShow}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Channel name:</Form.Label>
              <Form.Control
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

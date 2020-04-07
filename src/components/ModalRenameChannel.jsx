// @ts-check

import React, { useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { modalShowOnRenameChannel, renameChannel } from '../actions/index';

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { show, renameId, prevName } = useSelector((state) => state.channelsUI.renameChannelShow);

  const formControlEl = useRef(null);

  const handleClose = () => (
    dispatch(modalShowOnRenameChannel({ modalShow: false, renameId: null, prevName: '' }))
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: prevName,
      id: renameId,
    },
    onSubmit: ({ text: name, id }, { resetForm }) => {
      dispatch(renameChannel({ id, name }));
      handleClose();
      resetForm();
    },
  });

  const setSelected = () => setTimeout(() => formControlEl.current.select(), 200);

  return (
    <>
      <Modal centered show={show} onHide={handleClose} onEnter={setSelected} size="sm">
        <Modal.Header closeButton className="pb-2">
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New channel name:</Form.Label>
              <Form.Control
                ref={formControlEl}
                type="text"
                name="text"
                value={formik.values.text}
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

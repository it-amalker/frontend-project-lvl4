// @ts-check

import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { actions, asyncActions } from '../slices';
import { setSelect } from '../utils';

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { shown, renameId, prevName } = useSelector((state) => state.channelsUI.renameChannel);
  const { renameChannel } = asyncActions;

  const modalInput = useRef(null);

  const handleClose = () => (
    dispatch(actions.modalShowOnRenameChannel({ show: false, renameId: null, prevName: '' }))
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

  return (
    <>
      <Modal centered show={shown} onHide={handleClose} onEnter={setSelect(modalInput)} size="sm">
        <Modal.Header closeButton className="pb-2">
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New channel name:</Form.Label>
              <Form.Control
                ref={modalInput}
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

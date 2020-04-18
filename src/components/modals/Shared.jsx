// @ts-check

import React, { useRef } from 'react';
import {
  Button,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';

const modalInfoByType = {
  create: {
    title: 'Create new channel',
    label: 'Channel name:',
    buttonName: 'Add new channel',
  },
  rename: {
    title: 'Rename channel',
    label: 'New channel name:',
    buttonName: 'Rename',
  },
};

const ModalShared = ({ formik, onHide, type }) => {
  const modalInput = useRef(null);
  const { title, label, buttonName } = modalInfoByType[type];

  const setSelected = (el) => () => setTimeout(() => el.current.select(), 200);

  return (
    <Modal centered show onHide={onHide} onEnter={setSelected(modalInput)} size="sm">
      <Modal.Header closeButton className="pb-2">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              required
              ref={modalInput}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              maxLength={15}
            />
            <Form.Text className="text-muted">
              {formik.errors.name
                ? <span className="text-danger">{formik.errors.name}</span>
                : null}
            </Form.Text>
          </Form.Group>
          <Button block variant="primary" type="submit" disabled={formik.isSubmitting}>
            {buttonName}
            {' '}
            {formik.isSubmitting
              ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
              : null}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalShared;

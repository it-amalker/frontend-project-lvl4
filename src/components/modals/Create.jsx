// @ts-check

import React, { useRef } from 'react';
import {
  Button,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../routes';


const ModalCreateChannel = ({ onHide, setSelected }) => {
  const modalInput = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: 'New Channel',
    },
    onSubmit: async ({ name }, { setErrors }) => {
      try {
        const url = routes.channelsPath();
        await axios.post(url, { data: { attributes: { name } } });
        onHide();
      } catch (e) {
        setErrors({ name: 'Network problems' });
        throw new Error(`Failed to create new channel, probably network problems: ${e}`);
      }
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
                maxLength={15}
              />
              <Form.Text className="text-muted">
                {formik.errors.name
                  ? <span className="text-danger">{formik.errors.name}</span>
                  : null}
              </Form.Text>
            </Form.Group>
            <Button block variant="primary" type="submit" disabled={formik.isSubmitting}>
              Add new channel
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
    </>
  );
};

export default ModalCreateChannel;

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

const ModalRenameChannel = ({ channelInfo, onHide, setSelected }) => {
  const { id, prevName } = channelInfo;

  const modalInput = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: prevName,
    },
    onSubmit: async ({ name }, { setErrors }) => {
      try {
        const url = routes.channelPath(id);
        await axios.patch(url, { data: { attributes: { name } } });
        onHide();
      } catch (e) {
        setErrors({ name: 'Network problems' });
        throw new Error(`Failed to rename channel, probably network problems: ${e}`);
      }
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
            <Form.Group>
              <Form.Label>New channel name:</Form.Label>
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
              Rename
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

export default ModalRenameChannel;

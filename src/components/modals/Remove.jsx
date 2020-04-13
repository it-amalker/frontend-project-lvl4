// @ts-check

import React from 'react';
import {
  Button,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../routes';

const ModalRemoveChannel = ({ channelInfo, onHide }) => {
  const { id } = channelInfo;

  const formik = useFormik({
    initialValues: {
      submit: null,
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        const url = routes.channelPath(id);
        await axios.delete(url);
        onHide();
      } catch (e) {
        setErrors({ submit: 'Network problems' });
        throw new Error(`Failed to remove channel, probably network problems: ${e}`);
      }
    },
  });

  return (
    <>
      <Modal centered show onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Channel will be removed permanently</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ml-auto">
          <Form onSubmit={formik.handleSubmit}>
            {formik.errors.submit
              ? <span className="text-danger mr-2">{formik.errors.submit}</span>
              : null}
            <Button variant="secondary" type="button" onClick={onHide}>
              Cancel
            </Button>
            {' '}
            <Button variant="danger" type="submit" disabled={formik.isSubmitting}>
              Remove
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

export default ModalRemoveChannel;

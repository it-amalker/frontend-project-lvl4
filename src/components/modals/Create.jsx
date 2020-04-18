// @ts-check

import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import ModalShared from './Shared';

const ModalCreateChannel = ({ onHide }) => {
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
    <ModalShared formik={formik} onHide={onHide} type="create" />
  );
};

export default ModalCreateChannel;

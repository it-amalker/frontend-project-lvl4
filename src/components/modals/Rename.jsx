// @ts-check

import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../routes';
import ModalShared from './Shared';

const ModalRenameChannel = ({ channelInfo, onHide }) => {
  const { id, prevName } = channelInfo;

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
    <ModalShared formik={formik} onHide={onHide} type="rename" />
  );
};

export default ModalRenameChannel;

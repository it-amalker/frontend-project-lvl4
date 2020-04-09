// @ts-check

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import usernameContext from '../UsernameContext';
import { asyncActions } from '../slices';

const ChatField = () => {
  // @ts-ignore
  const { currentChannelId } = useSelector((state) => state.channels);
  const { create: createMessage } = asyncActions.createMessage();

  const author = useContext(usernameContext);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      createMessage({ text, author, currentChannelId });
      resetForm();
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <input
        className="form-control bg-light"
        name="text"
        type="text"
        value={formik.values.text}
        onChange={formik.handleChange}
      />
    </form>
  );
};

export default ChatField;

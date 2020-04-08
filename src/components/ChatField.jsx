// @ts-check

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { createMessage } from '../actions/index';

import usernameContext from '../usernameContext';

const ChatField = () => {
  // @ts-ignore
  const { currentChannelId } = useSelector(({ channels }) => channels);

  const dispatch = useDispatch();

  const author = useContext(usernameContext);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      dispatch(createMessage({ text, author, currentChannelId }));
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

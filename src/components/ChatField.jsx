// @ts-check

import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import usernameContext from '../UsernameContext';
import { asyncActions } from '../slices';

const ChatField = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { currentChannelId } = useSelector((state) => state.channels);
  const { createMessage } = asyncActions;

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

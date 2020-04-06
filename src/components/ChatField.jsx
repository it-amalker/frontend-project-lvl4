// @ts-check

import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../actions/index.js';
import { useFormik } from 'formik';
import usernameContext from '../usernameContext.js';

const ChatField = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  const { currentChannelId } = channelsState;

  const dispatch = useDispatch();

  const author = useContext(usernameContext);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      dispatch(actions.createMessage({ text, author, currentChannelId }));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        autoFocus
        className="form-control bg-light"
        name="text"
        type="text"
        value={formik.values.text}
        onChange={formik.handleChange} />
    </form>
  );
};

export default ChatField;

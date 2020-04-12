// @ts-check

import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import usernameContext from '../UsernameContext';
import MessagesStatus from './MessagesStatus';
import routes from '../routes';

const MessageInput = ({ messagesLength }) => {
  // @ts-ignore
  const { currentChannelId } = useSelector((state) => state.channels);

  const author = useContext(usernameContext);

  const inputElRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm, setErrors }) => {
      try {
        const url = routes.channelMessagesPath(currentChannelId);
        await axios.post(url, { data: { attributes: { text, author } } });
        resetForm();
      } catch (e) {
        setErrors({ text: `Network problems: ${e}` });
      }
    },
  });

  useEffect(() => {
    const setFocused = () => {
      inputElRef.current.focus();
    };
    setTimeout(setFocused, 100);
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <input
        ref={inputElRef}
        disabled={formik.isSubmitting}
        className="form-control bg-light"
        name="text"
        type="text"
        value={formik.values.text}
        onChange={formik.handleChange}
      />
      <MessagesStatus
        messagesLength={messagesLength}
        errors={formik.errors}
        isSubmitting={formik.isSubmitting}
      />
    </form>
  );
};

export default MessageInput;

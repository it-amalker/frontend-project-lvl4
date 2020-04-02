// @ts-check

import React from 'react';
import * as actions from '../actions/index.js';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  // @ts-ignore
  const channelsState = useSelector(({ channels }) => channels);
  // @ts-ignore
  const messagesState = useSelector(({ messages }) => messages);
  const dispatch = useDispatch();
  const { currentChannelId } = channelsState;
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm }) => {
      try {
        await dispatch(actions.createMessage({ text, currentChannelId }));
      } catch (e) {
        throw new Error(`Something wrong: ${e}`);
      }
      resetForm();
    },
  });
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div className="messages-block overflow-auto mb-3" />
        <div className="mt-auto">
          <form onSubmit={formik.handleSubmit}>
            <input
              className="form-control"
              name="text"
              type="text"
              value={formik.values.text}
              onChange={formik.handleChange} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

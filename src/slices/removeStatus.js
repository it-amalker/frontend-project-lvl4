// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'removeStatus',
  initialState: {
    errors: [],
  },
  reducers: {
    setError: (state, { payload: { error } }) => {
      state.errors.push(error);
    },
    resetErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

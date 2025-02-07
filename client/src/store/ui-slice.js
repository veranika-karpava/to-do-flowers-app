import { createSlice } from '@reduxjs/toolkit';

import { LABEL_THEME_MODE, FILTER_TERM } from '../data/constants.js';

const initialState = { theme: LABEL_THEME_MODE.LIGHT, filter: FILTER_TERM.ALL };

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggle: (state, action) => {
      state.theme = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { toggle, setFilter } = uiSlice.actions;

export default uiSlice;

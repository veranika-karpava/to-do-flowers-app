import { createSlice } from '@reduxjs/toolkit';

import { THEME_MODE, FILTER_TERMS } from '../data/constants.js';

const initialState = { theme: THEME_MODE.LIGHT, filter: FILTER_TERMS.ALL };

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

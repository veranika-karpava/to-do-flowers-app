import { createSlice } from "@reduxjs/toolkit";

import { LABEL_THEME_MODE } from '../constants'

const uiSlice = createSlice({
    name: 'ui',
    initialState: { theme: LABEL_THEME_MODE.LIGHT },
    reducers: {
        toggle(state) {
            state.theme = state.theme === LABEL_THEME_MODE.LIGHT ? LABEL_THEME_MODE.DARK : LABEL_THEME_MODE.LIGHT
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
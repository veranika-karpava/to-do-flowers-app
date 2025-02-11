import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice.js';
import authSlice from './auth-slice.js';
import apiSlice from './apiSlice.js';
import todosSlice from './todos-slice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    todos: todosSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

export default store;

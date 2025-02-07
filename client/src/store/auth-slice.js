import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  isAuth: !!localStorage.getItem('userInfo'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuth = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      state.isAuth = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice;

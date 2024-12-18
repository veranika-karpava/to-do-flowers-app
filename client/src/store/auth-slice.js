import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem('userToken') ?  localStorage.getItem('userToken') : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        userName: null,
        userToken,
        isAuthenticated: false,
    },
    reducers: {
        login(state, action) {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userToken = action.payload.userToken;
            state.isAuthenticated = true;

            localStorage.setItem('userToken', action.payload.userToken);
        },
        logout(state,action) {
            state.userId = null;
            state.userName = null;
            state.userToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userToken');
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
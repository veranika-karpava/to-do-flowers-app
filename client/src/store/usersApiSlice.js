import apiSlice from './apiSlice.js';
import { clearCredentials } from './auth-slice.js';
const USERS_URL = '/user';

export const handleAuthError = (dispatch) => {
  dispatch(clearCredentials());
  dispatch(apiSlice.util.resetApiState());
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: { ...credentials },
      }),
      transformErrorResponse: (response) => {
        if (response) {
          return {
            status: response.status,
            message: response.data?.message || 'An error occurred.',
          };
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: { ...credentials },
      }),
      transformErrorResponse: (response) => {
        if (response) {
          return {
            status: response.status,
            message: response.data?.message || 'An error occurred.',
          };
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          handleAuthError(dispatch);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = userApiSlice;

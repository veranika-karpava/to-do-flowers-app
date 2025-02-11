import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Task', 'UI'],
  endpoints: (builder) => ({}),
});

export default apiSlice;

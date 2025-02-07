import apiSlice from './apiSlice.js';
import { handleAuthError } from './usersApiSlice.js';

const TASKS_URL = '/tasks';

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
        method: 'GET',
      }),
      transformResponse: (response) => response.tasks,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'An error occurred.',
      }),
      providesTags: (result) =>
        result
          ? [...result.map((res) => ({ type: 'Task', id: res.id })), { type: 'Task', id: 'List' }]
          : [{ type: 'Task', id: 'List' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            handleAuthError(dispatch);
          }
        }
      },
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/new`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response?.task,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'An error occurred.',
      }),
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Task', id: 'List' }]),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            handleAuthError(dispatch);
          }
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, status }) => ({
        url: `${TASKS_URL}/${id}?completed=${status}`,
        method: 'PUT',
      }),
      transformResponse: (response) => response.task,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'An error occurred.',
      }),
      invalidatesTags: (result, error, { id }) => (error ? [] : [{ type: 'Task', id }]),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            handleAuthError(dispatch);
          }
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.task,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'An error occurred.',
      }),
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'Task', id }]),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            handleAuthError(dispatch);
          }
        }
      },
    }),
    deleteCompletedTasks: builder.mutation({
      query: () => ({
        url: `${TASKS_URL}/completed`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.tasks,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || 'An error occurred.',
      }),
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Task', id: 'List' }]),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            handleAuthError(dispatch);
          }
        }
      },
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteCompletedTasksMutation,
} = todosApiSlice;

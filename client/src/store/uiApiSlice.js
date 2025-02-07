import apiSlice from './apiSlice.js';
const QUOTE_URL = '/quote';

export const uiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuote: builder.query({
      query: () => ({
        url: QUOTE_URL,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchQuoteQuery } = uiApiSlice;

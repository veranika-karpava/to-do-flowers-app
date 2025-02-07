import apiSlice from './apiSlice.js';

import { PATH_API } from '../data/constants.js';

export const uiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuote: builder.query({
      query: () => ({
        url: PATH_API.QUOTE_URL,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchQuoteQuery } = uiApiSlice;

import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // for sending API request with default values
  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data,
          headers
        });
        const responseData = response.data;
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.response.data.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return { isLoading, error, setError, sendRequest };
};
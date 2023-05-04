import axios from 'axios';

const BASE_URL = 'https://api.clinicaltrialskorea.com/api/v1/search-conditions/';

export const client = axios.create();

const isSuccessfulStatus = (status: number) => (status >= 200 && status < 300) || status === 304;

client.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    if (isSuccessfulStatus(response.status)) {
      return response;
    } else {
      const { error, message, statusCode } = response.data;
      return Promise.reject(
        new Error(`statusCode: ${statusCode}, message: ${message}, error: ${error}`)
      );
    }
  },
  (error) => Promise.reject(error)
);

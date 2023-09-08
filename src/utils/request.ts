import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API as string,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (data) => data,
  ({ message, response }) => Promise.reject(response ? response.data : message),
);

export default instance;

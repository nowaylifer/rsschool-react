import axios, { isAxiosError } from 'axios';
import qs from 'qs';

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: 'comma' });
};

axios.interceptors.response.use(
  (resp) => resp,
  (error) => Promise.reject(isAxiosError(error) ? error.response?.data.error : error)
);

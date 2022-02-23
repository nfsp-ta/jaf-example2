import axios, { AxiosInstance } from 'axios';
import { API_ROOT } from './endpoints';

let axiosConnection: AxiosInstance | null = null;

const headers = {
  'Cache-Control': 'no-store',
  Accept: '*/*',
  Pragma: 'no-cache',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const additionalParams = {
  // key: 'e95894a0',
  _limit: 12,
};

const initConnection = () => {
  axiosConnection = axios.create({
    withCredentials: false,
    baseURL: API_ROOT,
    headers,
    params: additionalParams,
  });

  axiosConnection.interceptors.response.use(
    (resp) => resp,
    (err) => {
      if (err.message === 'Network Error') {
        console.error('Server connection is down');
      }
      switch (err.response?.status) {
        case 401: {
          console.error('Not authenticated');
          break;
        }
        case 403: {
          console.error('Not authorized');
          break;
        }
        default: break;
      }
      throw err;
    },
  );

  return axiosConnection;
};

export default axiosConnection || initConnection();

import axios, { AxiosInstance } from 'axios';

let axiosConnection: AxiosInstance | null = null;

const headers = {
  'Cache-Control': 'no-store',
  Accept: '*/*',
  Pragma: 'no-cache',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

// const baseURL = 'https://my.api.mockaroo.com/';
const baseURL = 'https://example-data.draftbit.com/';
const additionalParams = {
  // key: 'e95894a0',
  _limit: 10,
};

const initConnection = () => {
  axiosConnection = axios.create({
    withCredentials: false,
    baseURL,
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

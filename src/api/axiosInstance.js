import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_API}`,
  withCredentials: false,
  crossdomain: true,
});

instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('AUTH_JWT');
  const jwtRefresh = localStorage.getItem('AUTH_JWT_REFRESH');

  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`;
  }

  if (jwtRefresh) {
    config.headers['Authorization-Refresh'] = `Bearer ${jwtRefresh}`;
  }

  return config;
});

export default instance;

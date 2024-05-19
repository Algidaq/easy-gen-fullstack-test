import axios from 'axios';

export const AppAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? 'http://localhost:3000',
});

AppAxios.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem('authorization');
  reqConfig.headers.Authorization = token !== null ? `Bear ${token}` : null;
  return reqConfig;
});

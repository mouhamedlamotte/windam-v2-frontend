import { baseURL } from '@/constants';
import axios from 'axios';
import { getCookie } from 'cookies-next';




const Axiosinstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',

    }
  });

Axiosinstance.interceptors.request.use(function (config) {
  const token = getCookie("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default Axiosinstance;
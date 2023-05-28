import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.baseURL = "https://api.example.com";

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const get = (url, config = {}) => {
  return axiosInstance.get(url, config);
};

export const post = (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config);
};

export const del = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};

export const update = (url, data = {}, config = {}) => {
  return axiosInstance.put(url, data, config);
};

export const patch = (url, data = {}, config = {}) => {
  return axiosInstance.patch(url, data, config);
};

export default axiosInstance;

import obj from "../constants";
const axios = require("axios").default;
const headers = {};
const instance = axios.create({
  baseURL: `${obj.url}`,
  headers,
});
instance.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;

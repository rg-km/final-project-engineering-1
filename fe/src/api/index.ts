import axios from "axios";
import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});
Axios.interceptors.request.use((config: any) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

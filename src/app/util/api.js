import axios from "axios";
import Cookies from "js-cookie";

export const getAuthToken = () => {
  const token = Cookies.get("authToken");
  return token ? token : null;
};

export const api = axios.create({
  baseURL: "https://dibbs-back-end.onrender.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

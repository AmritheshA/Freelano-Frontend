import axios from "axios";
import { getCookie } from "typescript-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8765",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("AccessToken");
  if (accessToken) {
    const decodedToken = atob(accessToken);
    config.headers.Authorization = `Bearer ${decodedToken}`;
    console.log(config);
  }
  return config;
});
export default axiosInstance;
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "typescript-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8765",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("AccessToken");

  if (accessToken) {
    const decodedToken = atob(accessToken);
    const token = jwtDecode(decodedToken);
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config);
  }
  return config;
});
export default axiosInstance;
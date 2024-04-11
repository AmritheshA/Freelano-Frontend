import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8765",
  withCredentials: true,
});

export default axiosInstance;
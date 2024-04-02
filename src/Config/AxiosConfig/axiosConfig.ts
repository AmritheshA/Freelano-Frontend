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
    console.log("Token ............"+token.toString());
    
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXlveWF2NDY1QGZlbGliZy5jb20iLCJ1c2VySWQiOiJhNTIzNDFiYi0yZTBlLTQxZTUtOWQ4Ny1jOTNlMWZkODUwZDEiLCJ1c2VyTmFtZSI6IkFtcml0aGVzaCIsInJvbGUiOiJGUkVFTEFOQ0VSIiwiZXhwIjoxNzE0NTcwMjAyfQ.Y8ysUn9dlB4Lm5yC_cVEV1-oZfLFS4vdpn3eoF28QmA"
    console.log(config);
  }
  return config;
});
export default axiosInstance;
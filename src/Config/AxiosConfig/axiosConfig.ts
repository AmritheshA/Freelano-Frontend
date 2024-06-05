import axios from "axios";
import { getCookie } from "typescript-cookie";

const axiosInstance = axios.create({
  baseURL: "https://amrithesh.shop",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("AccessToken");
  const localToken = localStorage.getItem("token");

  if (accessToken) {
    const decodedToken = atob(accessToken);
    config.headers.Authorization = `Bearer ${decodedToken}`;
    console.log(config);
  }else if(localToken){
    config.headers.Authorization = `Bearer ${localToken}`;
  }
  return config
})

export default axiosInstance;
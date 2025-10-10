import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.146.33.211:8080/api", // use local IP if testing on real device
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

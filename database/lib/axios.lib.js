import axios from "axios";
import "dotenv/config";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export const axiosInstance1 = axios.create({
  baseURL: process.env.UNSPLASH_API_URI
}) 

export default axiosInstance;

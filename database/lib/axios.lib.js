import "dotenv/config";
import axios from "axios";

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined in environment variables");
}
if (!process.env.PEXELS_BASE_URL) {
  throw new Error("PEXELS_BASE_URL is not defined in environment variables");
}
if (!process.env.PEXELS_API_KEY) {
  throw new Error("PEXELS_API_KEY is not defined in environment variables");
}

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export const axiosInstance1 = axios.create({
  baseURL: process.env.PEXELS_BASE_URL,
  headers: {
    Authorization: process.env.PEXELS_API_KEY,
  },
});

export default axiosInstance;

import axios from "axios";
import StorageService from "@services/storage";
const API_URL = import.meta.env.VITE_API_URL;

const service = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  (requestConfig: any) => {
    const token = StorageService.getAuthData();
    if (token && token !== null && token !== "") {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { service };

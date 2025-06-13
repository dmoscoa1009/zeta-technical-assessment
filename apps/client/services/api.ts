import axios from "axios";
import { useUserStore } from "@/stores/user-store";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  // Get the token directly from the store
  const token = useUserStore.getState().token;

  // If token exists, add it to the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "";

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === "Network Error") {
      toast.error("Unable to connect to server. Please reload.");
    }

    return Promise.reject(error);
  }
);

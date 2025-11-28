// frontend/src/api/apiClient.js

import axios from "axios";

// Base URL comes from Vite env (frontend/.env)
// VITE_API_URL=http://localhost:5000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  // withCredentials: true, // enable this only if you start using cookies
});

// Attach JWT token (if present) to every request
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // if localStorage not available, just ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: simple response error logging (you can extend this later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default api;

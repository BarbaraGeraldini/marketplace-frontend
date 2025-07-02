import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usa la variable de entorno
});

export default api;

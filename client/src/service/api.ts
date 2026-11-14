import axios, { CanceledError } from "axios";

const isDevelopment = import.meta.env.DEV;
const envApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
const envPublicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;


const api = axios.create({
  baseURL:
    envApiBase ??
    (isDevelopment ? "http://localhost:4000/api" : "/api"),
  withCredentials: true,
});

const nPoint = envPublicOrigin ?? (isDevelopment ? "http://localhost:4000/" : "/");

export default api;
export { CanceledError, nPoint };

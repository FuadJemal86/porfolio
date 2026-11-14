import axios, { CanceledError } from "axios";

const isDevelopment = import.meta.env.DEV;
const envApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
const envPublicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;


const api = axios.create({
  baseURL:
    envApiBase ??
    (isDevelopment ? "https://porfolio-dyl3.onrender.com/api" : "/api"),
  withCredentials: true,
});

const nPoint = envPublicOrigin ?? (isDevelopment ? "https://porfolio-dyl3.onrender.com" : "/");

export default api;
export { CanceledError, nPoint };

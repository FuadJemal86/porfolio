import axios, { CanceledError } from "axios";

const isDevelopment = import.meta.env.DEV;
const envApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
const envPublicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;


const defaultProdApi = "https://aquaerp.onrender.com/api";
const defaultProdOrigin = "https://aquaerp.onrender.com";

const api = axios.create({
  baseURL:
    envApiBase ??
    (isDevelopment ? "http://localhost:4000/api" : defaultProdApi),
  withCredentials: true,
});

const nPoint =
  envPublicOrigin ??
  (isDevelopment ? "http://localhost:4000/" : defaultProdOrigin);

export default api;
export { CanceledError, nPoint };
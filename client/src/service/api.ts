import axios, { CanceledError } from "axios";

const envApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
const envPublicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;


const api = axios.create({
  // The visitor counter is served by the Node service, not by Vercel's static
  // frontend. Keeping this fallback cross-origin also prevents POST /visits
  // from being rewritten to the portfolio's index page (which returns 405).
  baseURL: envApiBase ?? "https://porfolio-dyl3.onrender.com/api",
  withCredentials: true,
});

const nPoint = envPublicOrigin ?? "https://porfolio-dyl3.onrender.com";

export default api;
export { CanceledError, nPoint };

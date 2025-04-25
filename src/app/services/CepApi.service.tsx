import axios from "axios";
import { env } from "../config/env";

export const CepApiService = axios.create({
  baseURL: env.VITE_CEPAPI_URL,
  timeout: 10000
});

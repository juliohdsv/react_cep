import axios from "axios";
import { env } from "../utils/env";

export const CepApiService = axios.create({
  baseURL: env.VITE_CEPAPI_URL,
  timeout: 5000
});

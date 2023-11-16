import axios from "axios";

const cepApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
  timeout: 5000
});

export default cepApi;
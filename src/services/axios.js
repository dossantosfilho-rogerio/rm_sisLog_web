import axios from 'axios';

// Configuração do axios com base na URL da API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

export default axiosInstance;

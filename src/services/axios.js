import axios from 'axios';
// Configuração do axios com base na URL da API
const axiosInstance = axios.create({
  baseURL: 'http://'+process.env.REACT_APP_API_URL+'/api',
    
  headers: {
      'Content-Type': 'application/json',
    },

  //withCredentials: true,
});

const token = localStorage.getItem('token'); 

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;

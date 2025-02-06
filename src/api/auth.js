import axios from 'axios';

// Função para login
export const login = async (cpf, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login', { cpf, password });
    if(response.data.token){
        localStorage.setItem('token', response.data.token); 
    } else {
        throw new Error('Erro no token.');
    }
    return response.data;  // Retorna o token
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const isAuthenticated = () => {
    // Simulação de verificação de token
    return localStorage.getItem("token") !== null;
  };
  

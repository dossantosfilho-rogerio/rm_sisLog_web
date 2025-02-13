import axiosInstance from "../../services/axios";

export const fetchPessoas = async (nome = null, cpfcnpj = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listPessoas', {
        params: {
            nome: nome,
            cpfcnpj: cpfcnpj,
          page: page,
          limit: limit
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
import axiosInstance from "../../services/axios";

export const fetchProdutos = async (nome = null, page = 1, limit = 9, categoria = null) => {
    try {
      const response = await axiosInstance.get('/listProdutos', {
        params: {
          page: page,
          limit: limit,
          categoria: categoria,  // Filtro por categoria (se disponível)
          name: nome,            // Filtro por nome (se disponível)
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
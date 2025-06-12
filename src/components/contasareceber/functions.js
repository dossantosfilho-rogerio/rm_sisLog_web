import axiosInstance from "../../services/axios";

export const fetchContasAReceber = async (status = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listContasAReceber', {
        params: {
          page: page,
          limit: limit
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  export const baixarContaAReceberBanco = async (id , data_pagamento, valor, tipo) => {
    try {
      const response = await axiosInstance.post('/baixarContaAReceber', {
        params: {
          id: id,
          data_pagamento: data_pagamento,
          valor: valor,
          tipo: tipo,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };


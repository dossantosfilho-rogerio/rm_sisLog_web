import axiosInstance from "../../services/axios";

export const fetchContasAReceberAbertos = async (status = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listContasAReceberAbertos', {
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

  export const baixarContaAReceberBanco = async (id) => {
    try {
      const response = await axiosInstance.post('/baixarContaAReceber', {
        params: {
          id: id
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };


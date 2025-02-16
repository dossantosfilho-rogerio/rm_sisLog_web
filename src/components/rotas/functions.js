import axiosInstance from "../../services/axios";

export const fetchRotas = async (titulo = null, placa = null, data = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listRotas', {
        params: {
          page: page,
          limit: limit,
          titulo: titulo,            // Filtros (se disponível)
          placa_veiculo: placa,
          data_saida: data,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  export const fetchCategoriasOptions = async (inputValue) => {
    if (!inputValue) return [];
  
    try {
      const response = await axiosInstance.get(`/listCategoriasSelect?search=${inputValue}`);
      return response.data.map((categoria) => ({
        value: categoria.id,
        label: categoria.nome
      }));
    } catch (error) {
      console.error("Erro ao buscar opções:", error);
      return [];
    }
  };



  export const createRota = async (titulo, descricao, pessoa_id, placa_veiculo, data_retorno, data_saida, status) => {    
    try {
      console.log(pessoa_id);
      const response = await axiosInstance.post('/createRota', {titulo, descricao, pessoa_id, placa_veiculo, data_retorno, data_saida, status});
    //console.log(response);
      return response;
      
    } catch (error) {
      console.error("Erro ao incluir o produto:", error);
      return [];
    }
  };
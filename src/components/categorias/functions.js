import axiosInstance from "../../services/axios";

export const fetchCategorias = async (nome = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listCategorias', {
        params: {
          page: page,
          limit: limit,
          name: nome,            // Filtro por nome (se disponível)
        }
      });
      console.log(response.data);
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



  export const createCategoria = async (nome) => {    
    try {
      const response = await axiosInstance.post('/createCategoria', {nome});
    //console.log(response);
      return response;
      
    } catch (error) {
      console.error("Erro ao incluir a categoria:", error);
      return [];
    }
  };
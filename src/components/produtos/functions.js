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


  export const createProduto = async (nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria_id) => {    
    try {
      const response = await axiosInstance.post('/createProduto', {nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria_id});
    //console.log(response);
      return response;
      
    } catch (error) {
      console.error("Erro ao incluir o produto:", error);
      return [];
    }
  };
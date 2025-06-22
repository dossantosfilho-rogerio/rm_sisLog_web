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

  export const getProduto = async (id) => {
    try {
      const response = await axiosInstance.get('/getProduto', {
        params: {
          id: id,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return [];
    }
  };


  export const createProduto = async (nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria) => {    

    try {
      const categoria_id = categoria;
      const response = await axiosInstance.post('/createProduto', {nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria_id});
    //console.log(response);
      return response;
      
    } catch (error) {
      console.error("Erro ao incluir o produto:", error);
      return [];
    }
  };


  export const updateProduto = async (id, nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria) => {    

    try {
      const categoria_id = categoria;
      const response = await axiosInstance.post('/updateProduto', {id, nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria_id});
    //console.log(response);
      return response;
      
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      return [];
    }
  };
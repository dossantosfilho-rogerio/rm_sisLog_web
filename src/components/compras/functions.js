import axiosInstance from "../../services/axios";

export const fetchCompras = async (numero_documento = null, fornecedor = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listCompras', {
        params: {
            numero_documento: numero_documento,
            fornecedor_id: fornecedor,
          page: page,
          limit: limit
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  export const fetchFornecedoresOptions = async (inputValue) => {
    if (!inputValue) return [];
  
    try {
      const response = await axiosInstance.get(`/listPessoas?search=${inputValue}`);
        console.log(response);
      return response.data.map((pessoa) => ({
        value: pessoa.id,
        label: pessoa.nome
      }));
    } catch (error) {
      console.error("Erro ao buscar opções:", error);
      return [];
    }
  };


  export const fetchProdutosOptions = async (inputValue) => {
    if (!inputValue) return [];
  
    try {
      const response = await axiosInstance.get(`/listProdutosSelect?search=${inputValue}`);
      return response.data.map((pessoa) => ({
        value: pessoa.id,
        label: pessoa.nome
      }));
    } catch (error) {
      console.error("Erro ao buscar opções:", error);
      return [];
    }
  };


  export const createCompra = async (fornecedor_id, data_compra, produtos) => {
    if (produtos.length <= 0) throw new Error("Necessário ao menos um produto.");
    
  
    try {
      let pessoa_id = fornecedor_id.value;
      const response = await axiosInstance.post(`/createCompra`, { pessoa_id, data_compra, produtos });
      return response.data;
      
    } catch (error) {
      console.error("Erro ao incluir a compra:", error);
      return [];
    }
  };
  
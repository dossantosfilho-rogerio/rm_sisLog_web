import axiosInstance from "../../services/axios";

export const fetchVendas = async (numero_documento = null, cliente = null, rota = null, page = 1, limit = 9) => {
    try {
      const response = await axiosInstance.get('/listVendas', {
        params: {
            numero_documento: numero_documento,
            cliente_id: cliente,
            rota_id: rota,
          page: page,
          limit: limit
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  export const existVenda = async (id = null, numero_documento = null, cliente = null, rota = null) => {
    //retorna vendas cujo parâmetros são exatos ao da busca.
    try {
      const response = await axiosInstance.get('/existVenda', {
        params: {
            id: id,
            numero_documento: numero_documento,
            cliente_id: cliente,
            rota_id: rota
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  export const fetchPessoasOptions = async (inputValue) => {
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

  export const fetchRotasOptions = async (inputValue) => {
    if (!inputValue) return [];
  
    try {
      const response = await axiosInstance.get(`/listRotasSelect?search=${inputValue}`);
      return response.data.map((rota) => ({
        value: rota.id,
        label: rota.titulo + ' - ' + rota.placa_veiculo + ' Saída: ' + new Date(rota.data_saida).toLocaleDateString('pt-BR')
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


  export const createVenda = async (cliente, vendedor, rota, numero_documento, data_venda, produtos) => {
    if (produtos.length <= 0) throw new Error("Necessário ao menos um produto.");
    
  
    try {
      let cliente_id = cliente.value;
      let vendedor_id = vendedor.value;
      let rota_id = null;
      if(rota != null){
        rota_id = rota.value;
      }
      const response = await axiosInstance.post(`/createVenda`, { cliente_id, vendedor_id, rota_id, numero_documento, data_venda, produtos });
      return response;
      
    } catch (error) {
      console.error("Erro ao incluir a Venda:", error);
      return [];
    }
  };
  
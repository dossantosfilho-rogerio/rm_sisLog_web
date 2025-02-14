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


  export const createPessoa = async (nome, cpfcnpj, telefone, email, logradouro, numero, complemento, CEP, cidade, bairro, uf) => {    
    try {
      const cep = CEP;
      const response = await axiosInstance.post('/createPessoa', {nome, cpfcnpj, telefone, email, logradouro, numero, complemento, cep, cidade, bairro, uf});
    
      return response.data;
      
    } catch (error) {
      console.error("Erro ao incluir a pessoa:", error);
      return [];
    }
  };
import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

export const cadastrarPessoa = async (pessoa: any) => {
    try {
      const response = await api.post('/pessoa', pessoa);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status diferente de 2xx
        console.error('Erro na resposta do servidor:', error.response.data);
        console.error('Status do erro:', error.response.status);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('Erro na requisição:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que acionou um erro
        console.error('Erro ao configurar a requisição:', error.message);
      }
      console.error('Configuração da requisição:', error.config);
      throw error;
    }
  };

export const relatorioPessoas = async () => {
  try {
    const response = await api.get('/pessoa');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados das pessoas:', error);
    throw error;
  }
};

export const consultaCEP = async (cep: any) => {
    try {
        const retorno = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return retorno.data;
    } catch (error) {
        console.error('Erro ao buscar CEP', error);
        throw error;
    }
}

export default api;

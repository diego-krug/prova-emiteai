import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

export const cadastrarPessoa = async (pessoa: any) => {
  try {
    const response = await api.post('/pessoa', pessoa);
    return response.data;
  } catch (error: any) {
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

export const solicitarGeracaoRelatorio = async () => {
  const response = await axios.get('/relatorio');
  return response.data;
};

export default api;

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { cadastrarPessoa, consultaCEP } from '../services/api';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 600px;
    margin: auto;
`;

const Form: React.FC = () => {
    const initialFormData = {
        nome: '',
        telefone: '',
        cpf: '',
        endereco: '',
        numero: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        uf: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let cep = e.target.value.replace(/\D/g, '');
        if (cep.length > 5) {
            cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
        }
        setFormData({ ...formData, cep });
    
        if (cep.length === 9) {
            try {
                const response = await consultaCEP(cep);
                const { logradouro, bairro, localidade, uf } = response;
                setFormData(prevState => ({ ...prevState, bairro, cidade: localidade, uf: uf, endereco: logradouro }));
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados do formulário:", JSON.stringify(formData, null, 2));
        try {
            const response = await cadastrarPessoa(formData);
            console.log("Dados enviados com sucesso:", response.data);
            alert("Cadastro realizado com sucesso!");
            setFormData(initialFormData); // Limpa o formulário
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
        }
    };    

    return (
        <FormContainer onSubmit={handleSubmit}>
            <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
            <TextField label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
            <TextField label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} required />
            <TextField label="CEP" name="cep" value={formData.cep} onChange={handleCepChange} required />
            <TextField label="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} required disabled />
            <TextField label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
            <TextField label="Número" name="numero" value={formData.numero} onChange={handleChange} required />
            <TextField label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} required disabled />
            <TextField label="Município" name="municipio" value={formData.cidade} onChange={handleChange} required disabled />
            <TextField label="Estado" name="estado" value={formData.uf} onChange={handleChange} required disabled />
            <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
        </FormContainer>
    );
};

export default Form;

-- Adicionar a extensão uuid-ossp se ela não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela Pessoa
CREATE TABLE IF NOT EXISTS Pessoa (
                                      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                      nome VARCHAR(255) NOT NULL,
                                      telefone VARCHAR(255) NOT NULL,
                                      cpf VARCHAR(255) NOT NULL UNIQUE,
                                      endereco VARCHAR(255) NOT NULL,
                                      numero VARCHAR(255) NOT NULL,
                                      complemento VARCHAR(255) NULL,
                                      cep VARCHAR(255) NOT NULL,
                                      bairro VARCHAR(255) NOT NULL,
                                      cidade VARCHAR(255) NOT NULL,
                                      uf VARCHAR(255) NOT NULL
);
import React, {useEffect} from 'react';
import Form from '../components/Form';

const CadastroPessoa: React.FC = () => {
    useEffect(() => {
        document.title = "Prova - Cadastro de Pessoa";
    }, []);
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Cadastro de Pessoa Física</h1>
            <Form />
        </div>
    );
};

export default CadastroPessoa;

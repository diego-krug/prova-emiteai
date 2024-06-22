import React, {useEffect} from 'react';
import homeImage from '../assets/images/home.png'

const CadastroPessoa: React.FC = () => {
    useEffect(() => {
        document.title = "Prova Emiteaí";
    }, []);
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Bem vindo a Prova Emiteaí</h1>
            <img src={homeImage} alt="Welcome" style={{ maxWidth: '50%', maxHeight: '50%' }} />
        </div>
    );
};

export default CadastroPessoa;

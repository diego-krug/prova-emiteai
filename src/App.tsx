import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import CadastroPessoa from './pages/CadastroPessoa';
import Relatorio from './pages/Relatorio';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const App: React.FC = () => {
  return (
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroPessoa />} />
          <Route path="/relatorio" element={<Relatorio />} />
        </Routes>
      </Router>
  );
};

export default App;

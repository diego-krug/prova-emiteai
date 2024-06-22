// src/pages/Relatorio.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { relatorioPessoas } from '../services/api';
import { CSVLink } from 'react-csv';
import { ArrowBack, ArrowForward, FirstPage, LastPage } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material';

const Relatorio: React.FC = () => {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(20);

  useEffect(() => {
    const getPessoas = async () => {
      try {
        const data = await relatorioPessoas();
        setPessoas(data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar os dados.');
        setLoading(false);
      }
    };

    getPessoas();
  }, []);

  const generateCSVData = () => {
    return pessoas.map((pessoa) => ({
      Nome: pessoa.nome,
      CPF: pessoa.cpf,
      Telefone: pessoa.telefone,
      Endereço: pessoa.endereco,
      Número: pessoa.numero,
      Complemento: pessoa.complemento ? pessoa.complemento : '',
      Bairro: pessoa.bairro,
      Cidade: pessoa.cidade,
      Estado: pessoa.uf,
    }));
  };

  const totalPages = Math.ceil(pessoas.length / recordsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleRecordsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever records per page is changed
  };

  const currentPageData = pessoas.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Relatório de Pessoas</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        <CSVLink
          data={generateCSVData()}
          filename={"relatorio_pessoas.csv"}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Baixar CSV
        </CSVLink>
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Endereço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>{pessoa.nome}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.telefone}</TableCell>
                <TableCell>
                  {[pessoa.endereco, pessoa.numero, pessoa.complemento, pessoa.bairro, pessoa.cidade, pessoa.uf]
                    .filter(Boolean)  // Ignora campos vazios
                    .join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel>Qtde Registros</InputLabel>
        <Select
          value={recordsPerPage}
          onChange={handleRecordsPerPageChange}
          label="Registros por página"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
        <IconButton onClick={handleFirstPage} disabled={currentPage === 1}>
          <FirstPage />
        </IconButton>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBack />
        </IconButton>
        <Typography variant="body2" sx={{ mx: 2 }}>
          Página {currentPage} de {totalPages}
        </Typography>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowForward />
        </IconButton>
        <IconButton onClick={handleLastPage} disabled={currentPage === totalPages}>
          <LastPage />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Relatorio;

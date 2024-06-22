import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, CssBaseline } from '@mui/material';
import CadastroPessoa from './CadastroPessoa';
import Relatorio from './Relatorio';
import Inicio from './Inicio';

const drawerWidth = 240;

const Home: React.FC = () => {
  const [content, setContent] = useState<string>('home');

  const renderContent = () => {
    switch (content) {
      case 'home':
        return <Inicio />;
      case 'cadastro':
        return <CadastroPessoa />;
      case 'relatorio':
        return <Relatorio />;
      default:
        return <Inicio />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setContent('home')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => setContent('cadastro')}>
              <ListItemText primary="Cadastro Pessoas" />
            </ListItem>
            <ListItem button onClick={() => setContent('relatorio')}>
              <ListItemText primary="Relatório" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Home;

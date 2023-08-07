import React from 'react';
import { Container, Typography } from '@mui/material';
import ChampionComparison from './components/ChampionComparison';

import { champions } from './ChampionData';
import './App.css';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        Champion Comparer
      </Typography>
      <ChampionComparison champions={champions.data} />
    </Container>
    
  );
}

export default App;

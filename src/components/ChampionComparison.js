import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import ChampionCard from './ChampionCard';

const ChampionComparison = ({ champions }) => {
  const [selectedChampions, setSelectedChampions] = useState([null, null]);
  const [activeSelection, setActiveSelection] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleChampionSelect = (id) => {
    const newSelectedChampions = [...selectedChampions];
    newSelectedChampions[activeSelection] = champions[id];
    setSelectedChampions(newSelectedChampions);
    setActiveSelection((activeSelection + 1) % 2);
  };

  const handleReset = () => {
    setSelectedChampions([null, null]);
    setActiveSelection(0);
    setLocked(false);
  };

  const handleLock = () => {
    setLocked(true);
  };

  const nameToImage = {
    "Nunu & Willump": "Nunu",
    "Renata Glasc": "Renata",
    "Wukong": "MonkeyKing",
    // ... more mappings if needed
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {[0, 1].map((index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Champion {index + 1}
              </Typography>
              <ChampionCard champion={selectedChampions[index]} locked={locked} />
              {locked && (
                <Grid container spacing={2}>
                  {/* Add your content here for the 3x2 grid */}
                  <Grid item xs={4}>
                    {/* Content for the grid */}
                  </Grid>
                  <Grid item xs={4}>
                    {/* Content for the grid */}
                  </Grid>
                  <Grid item xs={4}>
                    {/* Content for the grid */}
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset Selection
        </Button>
        <Button variant="contained" color="primary" onClick={handleLock} disabled={locked}>
          Lock in Selections
        </Button>
        {!locked && (
          <Grid container spacing={2}>
            {Object.values(champions).map((champion) => (
              <Grid item key={champion.id}>
              <img
  src={`${process.env.PUBLIC_URL}/champIcons/${(nameToImage[champion.name] || champion.name.replace(/ /g, '').replace(/'/g, '').replace(/\./g, '')).toLowerCase()}.png`}
  alt={champion.name}
  style={{ cursor: 'pointer', width: '50px', height: '50px' }}
  onClick={() => handleChampionSelect(champion.id)}
/>





              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ChampionComparison;

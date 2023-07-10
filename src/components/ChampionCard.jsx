import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Slider, Container, Box } from '@mui/material';
import { GridComponent } from './GridComponent';
import { items } from '../ItemData';

const ChampionCard = ({ champion, locked }) => {
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState(champion ? champion.stats : {});
  const [itemStats, setItemStats] = useState({}); // new state
  const [selectedItems, setSelectedItems] = useState(Array(6).fill(null)); 

  useEffect(() => {
    if (champion) {
      setStats(champion.stats);
    }
  }, [champion]);

  const handleLevelChange = (event, newValue) => {
    setLevel(newValue);
  };

  const handleItemSelect = (item, index) => { 
    const newStats = { ...itemStats }; // operate on itemStats
    for (const stat in item.stats) {
      if (newStats[stat] !== undefined) {
        newStats[stat] += item.stats[stat];
      } else {
        newStats[stat] = item.stats[stat];
      }
    }
    setItemStats(newStats); // setItemStats instead
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems[index] = item;
      return newItems;
    });
  };

  const handleItemRemove = (item, index) => { 
    const newStats = { ...itemStats }; // operate on itemStats
    for (const stat in item.stats) {
      if (newStats[stat] !== undefined) {
        newStats[stat] -= item.stats[stat];
      }
    }
    setItemStats(newStats); // setItemStats instead
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems[index] = null;
      return newItems;
    });
  };

  const renderStats = () => {
    if (!stats) {
      return null;
    }
  
    const unwantedStats = [
      'hpperlevel',
      'mpperlevel',
      'movespeed',
      'armorperlevel',
      'spellblockperlevel',
      'attackrange',
      'hpregenperlevel',
      'mpregenperlevel',
      'critperlevel',
      'attackdamageperlevel',
      'attackspeedperlevel',
    ];
  
    return Object.entries(stats)
      .filter(([statName]) => !unwantedStats.includes(statName))
      .map(([statName, statValue]) => {
        const scaledStat = Math.round(statValue + (stats[`${statName}perlevel`] || 0) * (level - 1));
        return (
          <Typography variant="body2" color="text.secondary" key={statName}>
            {statName}: {scaledStat}
          </Typography>
        );
      });
  };
  const renderItemEffects = () => { // new method
    return Object.entries(itemStats)
      .map(([statName, statValue]) => (
        <Typography variant="body2" color="text.secondary" key={statName}>
          {statName}: {statValue}
        </Typography>
      ));
  };

  if (!champion) {
    return null;
  }

  const { name, title } = champion;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        <div>
          <Typography id="level-slider" gutterBottom>
            Level: {level}
          </Typography>
          <Slider
            aria-label="Level"
            defaultValue={1}
            min={1}
            max={18}
            step={1}
            valueLabelDisplay="auto"
            onChange={handleLevelChange}
          />
        </div>
        <Typography variant="h6" component="div">
          Champion Stats:
        </Typography>
        {renderStats()}
        <Typography variant="h6" component="div">
          Item Effects:
        </Typography>
        <Box sx={{ p: 1, m: 1, border: '1px solid #000', borderRadius: '5px' }}> 
          {renderItemEffects()} 
        </Box>
        <Container>
          <GridComponent
            items={Object.values(items.data)}
            onItemSelect={handleItemSelect}
            onItemRemove={handleItemRemove}
          />
        </Container>
      </CardContent>
    </Card>
  );
};

export default ChampionCard;

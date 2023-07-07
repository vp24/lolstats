import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Slider, Container } from '@mui/material';
import { GridComponent } from './GridComponent';
import { items } from '../ItemData';

const ChampionCard = ({ champion, locked }) => {
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState(champion ? champion.stats : {});

  useEffect(() => {
    if (champion) {
      setStats(champion.stats);
    }
  }, [champion]);

  const handleLevelChange = (event, newValue) => {
    setLevel(newValue);
  };

  const handleItemSelect = (item) => {
    const newStats = { ...stats };
    for (const stat in item.stats) {
      if (newStats[stat] !== undefined) {
        newStats[stat] += item.stats[stat];
      }
    }
    setStats(newStats);
  };

  const handleItemRemove = (item) => {
    const newStats = { ...stats };
    for (const stat in item.stats) {
      if (newStats[stat] !== undefined) {
        newStats[stat] -= item.stats[stat];
      }
    }
    setStats(newStats);
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
        {renderStats()}
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

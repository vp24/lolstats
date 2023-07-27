import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Slider, Container, Box } from '@mui/material';
import { GridComponent } from './GridComponent';
import { items } from '../ItemData';

const statNameMap = {
  'FlatPhysicalDamageMod': 'attackdamage',
  'FlatHPPoolMod': 'hp',
  'FlatCritChanceMod': 'crit',
  'FlatSpellBlockMod': 'spellblock',
  'PercentAttackSpeedMod': 'attackspeed',
};

const ChampionCard = ({ champion, locked }) => {
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState(champion ? champion.stats : {});
  const [itemStats, setItemStats] = useState({});
  const [combinedStats, setCombinedStats] = useState({});

  useEffect(() => {
    if (champion) {
      setStats(champion.stats);
    }
  }, [champion]);

  useEffect(() => {
    let newCombinedStats = {};
    const allStats = {...stats, ...itemStats};
    for (let stat in allStats) {
      newCombinedStats[stat] = (stats[stat] || 0) + (itemStats[stat] || 0);
    }
    setCombinedStats(newCombinedStats);
  }, [stats, itemStats]);

  const handleLevelChange = (event, newValue) => {
    setLevel(newValue);
  };

  const handleItemSelect = (item) => {
    const newItemStats = { ...itemStats };
    for (const stat in item.stats) {
      const normalizedName = statNameMap[stat] || stat;
      if (newItemStats[normalizedName] !== undefined) {
        newItemStats[normalizedName] += item.stats[stat];
      } else {
        newItemStats[normalizedName] = item.stats[stat];
      }
    }
    setItemStats(newItemStats);
  };

  const handleItemRemove = (item) => {
    const newItemStats = { ...itemStats };
    for (const stat in item.stats) {
      const normalizedName = statNameMap[stat] || stat;
      if (newItemStats[normalizedName] !== undefined) {
        newItemStats[normalizedName] -= item.stats[stat];
      }
    }
    setItemStats(newItemStats);
  };

  const renderStats = (currentStats) => {
    if (!currentStats) {
      return null;
    }

    const unwantedStats = [
      'hpperlevel',
      'mpperlevel',
      'movespeed',
      'armorperlevel',
      'spellblockperlevel',
      'attackrange',
      'hpregen',
      'mpregen',
      'hpregenperlevel',
      'mpregenperlevel',
      'critperlevel',
      'attackdamageperlevel',
      'attackspeedperlevel',
    ];

    return Object.entries(currentStats)
      .filter(([statName]) => !unwantedStats.includes(statName))
      .map(([statName, statValue]) => {
        const scaledStat = Math.round(statValue + (currentStats[`${statName}perlevel`] || 0) * (level - 1));
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
        {locked && (
          <>
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
            <Box>
              <Typography variant="h6">Champion Stats:</Typography>
              {renderStats(stats)}
            </Box>
            <Box>
              <Typography variant="h6">Item Stats:</Typography>
              {renderStats(itemStats)}
            </Box>
            <Box>
              <Typography variant="h6">Combined Stats:</Typography>
              {renderStats(combinedStats)}
            </Box>
            <Container>
              <GridComponent
                items={Object.values(items.data)}
                onItemSelect={handleItemSelect}
                onItemRemove={handleItemRemove}
              />
            </Container>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChampionCard;

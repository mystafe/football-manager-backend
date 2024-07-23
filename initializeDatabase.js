const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');
const fs = require('fs');
const path = require('path');

const initializeDatabase = async () => {
  try {
    const teamCount = await Team.countDocuments();
    if (teamCount > 0) {
      console.log('Veritabanı zaten initialize edilmiş');
      return;
    }

    const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'teams.json'), 'utf8'));

    for (const teamData of teamsData) {
      const { players, ...teamInfo } = teamData;

      const createdPlayers = await Player.insertMany(players);

      const team = new Team({
        ...teamInfo,
        players: createdPlayers.map(player => player._id)
      });

      await team.save();
    }

    console.log('Veritabanı başarıyla initialize edildi');
  } catch (error) {
    console.error('Veritabanı initialize edilirken hata:', error);
  }
};

module.exports = initializeDatabase;
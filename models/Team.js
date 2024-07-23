const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  position: String,
  goalkeeping: Number,
  defense: Number,
  midfield: Number,
  attack: Number,
  strength: Number,
  goals: Number
});

const TeamSchema = new mongoose.Schema({
  name: String,
  goals: Number,
  players: [PlayerSchema]
});

module.exports = mongoose.model('Team', TeamSchema);
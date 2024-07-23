const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  goalkeeping: { type: Number, default: 0 },
  defense: { type: Number, default: 0 },
  midfield: { type: Number, default: 0 },
  attack: { type: Number, default: 0 },
  strength: { type: Number, default: 0 },
  goals: { type: Number, default: 0 }
});

module.exports = mongoose.model('Player', playerSchema);
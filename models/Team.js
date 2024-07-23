const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  strength: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] // Player referanslarını tutan bir dizi
});

module.exports = mongoose.model('Team', teamSchema);
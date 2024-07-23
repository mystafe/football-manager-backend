const express = require('express');
const Player = require('../models/Player');

const router = express.Router();

// Tüm oyuncuları döndür
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching player', error });
  }
});

// Route to add a new player
router.post('/', async (req, res) => {
  const { name, position, goalkeeping, defense, midfield, attack, strength, goals } = req.body;

  try {
    const newPlayer = new Player({ name, position, goalkeeping, defense, midfield, attack, strength, goals });
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(500).json({ message: 'Error adding player', error });
  }
});

// Route to update a player
router.put('/:id', async (req, res) => {
  const { name, position, goalkeeping, defense, midfield, attack, strength, goals } = req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      { name, position, goalkeeping, defense, midfield, attack, strength, goals },
      { new: true }
    );
    if (!updatedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating player', error });
  }
});

// Route to delete a player
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting player', error });
  }
});

module.exports = router;
const express = require('express');
const Team = require('../models/Team');
const Player = require('../models/Player');

const router = express.Router();

// Tüm takımları ve oyuncuları döndür
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('players'); // populate ile oyuncuları da dahil ediyoruz
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
});

// Route to add a new team
router.post('/', async (req, res) => {
  const { name, strength, goals, players } = req.body;

  try {
    const newTeam = new Team({ name, strength, goals, players });
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error adding team', error });
  }
});

// Route to update a team
router.put('/:id', async (req, res) => {
  const { name, strength, goals, players } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, { name, strength, goals, players }, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error });
  }
});

// Route to delete a team
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

// Route to delete all teams and players
router.get('/deleteall', async (req, res) => {
  try {
    await Team.deleteMany({});
    await Player.deleteMany({});
    res.json({ message: 'All teams and players deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all teams and players', error });
  }
});

module.exports = router;
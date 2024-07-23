const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const initializeDatabase = require('./initializeDatabase'); // initializeDatabase fonksiyonunu import edin

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await initializeDatabase(); // Veritabanını initialize edin
  })
  .catch(err => console.log(err));

const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players'); // playersRouter'ı import edin

app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter); // players endpoint'i ekleyin

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
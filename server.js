const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Team = require('./models/Team'); // Team modelini import edin
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Veritabanında veri olup olmadığını kontrol et
    try {
      const count = await Team.countDocuments({});
      if (count === 0) {
        // JSON dosyasını oku ve MongoDB'ye ekle
        const dataPath = path.join(__dirname, 'data', 'teams.json');
        fs.readFile(dataPath, 'utf8', async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const teams = JSON.parse(data);
            await Team.insertMany(teams);
            console.log('Initial data inserted');
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  })
  .catch(err => console.log(err));

const teamsRouter = require('./routes/teams');
app.use('/teams', teamsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
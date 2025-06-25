const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();

app.use(cors({origin: ' http://localhost:3000'}));
app.use(express.json());

app.use('/feedback', feedbackRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
});

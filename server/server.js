const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const donationRoutes = require('./routes/donationRoutes');
const mpesaRoutes = require('./routes/mpesaRoutes');
const sendSMS = require('./helpers/sendSMS'); 
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/mpesa', mpesaRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { Parser } = require('json2csv');

// Keep these in controller (complex logic)
const { donate, getAnalytics } = require('../controllers/donationController');

// Still using controller for donation with STK Push + SMS
router.post('/initiate', donate);

// Inline: Get all donations (simple)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.cause) {
      filter.cause = req.query.cause;
    }
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Inline: Export CSV (simple)
router.get('/export', async (req, res) => {
  try {
    const donations = await Donation.find({});
    const parser = new Parser();
    const csv = parser.parse(donations);
    res.header('Content-Type', 'text/csv');
    res.attachment('donations.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export donations' });
  }
});

// Still using controller for analytics (aggregation logic)
router.get('/analytics', getAnalytics);

// Inline: Get a single donation by ID (simple)
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;

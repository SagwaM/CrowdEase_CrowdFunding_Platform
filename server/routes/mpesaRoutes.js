// routes/mpesa.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // Mongoose model
const {normalizedPhoneNumber} = require('../helpers/sendSMS');

router.post('/stk-callback', async (req, res) => {
  const callback = req.body.Body.stkCallback;

  if (callback.ResultCode === 0) {
    const metadata = callback.CallbackMetadata.Item;

    const data = {
      phone: normalizedPhoneNumber(metadata.find(i => i.Name === 'PhoneNumber')?.Value?.toString() || ''),
      amount: metadata.find(i => i.Name === 'Amount')?.Value,
      mpesaReceiptNumber: metadata.find(i => i.Name === 'MpesaReceiptNumber')?.Value,
      transactionDate: metadata.find(i => i.Name === 'TransactionDate')?.Value,
    };

    try {
      // Save to MongoDB
      const payment = new Payment(data);
      await payment.save();

      // Send SMS
      await sendSMS(data.phone, `Hi! Your donation of KES ${data.amount} has been received. Thank you!`);

    } catch (err) {
      console.error('Error saving payment or sending SMS:', err.message);
    }
  }

  res.json({ ResultCode: 0, ResultDesc: 'Callback received successfully' });
});
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

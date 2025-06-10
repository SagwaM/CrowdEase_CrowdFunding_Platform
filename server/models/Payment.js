const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  mpesaReceiptNumber: String,
  transactionDate: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

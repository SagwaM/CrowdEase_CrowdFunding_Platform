const Donation = require('../models/Donation');
const initiateStkPush = require('../helpers/stkPush');
const sendSMS = require('../helpers/sendSMS');
const normalizePhoneNumber = require('../helpers/normalizePhoneNumber');

const donate = async (req, res) => {
  const { name, phone, amount, cause, message } = req.body;

  try {
    if (!name || !phone || !amount || !cause) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const { forMpesa, forSms } = normalizePhoneNumber(phone);
    const donation = await Donation.create({ name, phone: forSms, amount, cause, message });

    const stkResponse = await initiateStkPush({ phone:forMpesa, amount });

    try {
      await sendSMS(phone, `Hi ${name}, your donation of KES ${amount} has been received. Thank you!`);
    } catch (smsError) {
      console.error('SMS Error:', smsError.message);
    }

    res.status(200).json({
      success: true,
      message: 'STK Push initiated',
      merchantRequestID: stkResponse.MerchantRequestID,
    });
  } catch (error) {
    console.error('Error during donation:', error.message);
    res.status(500).json({ success: false, message: 'Donation failed' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const uniqueDonors = await Donation.distinct('phone');
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const topCauses = await Donation.aggregate([
      { $group: { _id: "$cause", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      uniqueDonors: uniqueDonors.length,
      topCauses
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

module.exports = {
  donate,
  getAnalytics,
};

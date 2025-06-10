const axios = require('axios');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const normalizePhoneNumber = require('./normalizePhoneNumber');

const generateAccessToken = async () => {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  return res.data.access_token;
};

const initiateStkPush = async ({ phone, amount }) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString('base64');

  const { forMpesa } = normalizePhoneNumber(phone);
  const token = await generateAccessToken();

  const res = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: forMpesa,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: forMpesa,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'Crowdfund',
      TransactionDesc: 'Donation Payment'
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

module.exports = initiateStkPush;

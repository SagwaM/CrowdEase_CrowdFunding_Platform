// smsService.js
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to,
    });
    console.log('SMS sent:', res.sid);
    return res;
  } catch (err) {
    console.error('Error sending SMS:', err);
    throw err;
  }
};

module.exports = sendSMS;

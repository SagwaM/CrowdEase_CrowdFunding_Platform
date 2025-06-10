// helpers/normalizePhoneNumber.js

// Converts 0712345678 or +254712345678 to 254712345678 (for M-Pesa)
// Also returns +254712345678 (for Twilio)
const normalizePhoneNumber = (input) => {
  let phone = input.trim();

  // Convert 07XXXXXXXX → 2547XXXXXXXX
  if (phone.startsWith('07')) {
    phone = '254' + phone.slice(1);
  }

  // Convert +254XXXXXXXXX → 254XXXXXXXXX
  if (phone.startsWith('+')) {
    phone = phone.slice(1);
  }

  // Now phone is guaranteed to be 2547XXXXXXXX
  return {
    forMpesa: phone,
    forSms: '+' + phone,
  };
};

module.exports = normalizePhoneNumber;

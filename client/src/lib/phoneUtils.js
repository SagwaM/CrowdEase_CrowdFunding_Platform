// utils/phoneUtils.js (create this if needed)
export const normalizePhoneNumber = (phone) => {
  // If user enters 07XXXXXXXX → convert to +2547XXXXXXXX
  if (phone.startsWith('0')) {
    return '+254' + phone.slice(1);
  }
  // If already +2547XXXXXXXX → return as is
  if (phone.startsWith('+254') && phone.length === 13) {
    return phone;
  }
  return phone; // fallback
};

const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, body) => {
  return await client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
};

module.exports = { sendSMS };

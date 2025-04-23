const express = require('express');
const router = express.Router();
const { sendSMS } = require('../services/twilioService');

router.post('/send', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }

  try {
    const smsResponse = await sendSMS(phoneNumber, message);
    res.status(200).json({ success: true, sid: smsResponse.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send SMS.' });
  }
});

module.exports = router;

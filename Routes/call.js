// routes/call.js
const express = require('express');
const router = express.Router();
const { Twilio } = require('twilio');
const ngrok = require('ngrok');

// Twilio credentials
const accountSid = 'AC529894dc78624e435dec4141fc5b41ca';
const authToken = '521f587d98a01e7a14587cb5c63b576e';
const twilioNumber = '+21651996304';  // Replace with your Twilio number

// Twilio client
const client = new Twilio(accountSid, authToken);

// Endpoint to trigger the call
router.post('/:targetNumber', async (req, res) => {
    try {
        // Extract phone number from the URL parameter
        const targetNumber = req.params.targetNumber;
        
        if (!targetNumber) {
            return res.status(400).json({ error: 'Target phone number is required' });
        }

        // Use ngrok to get a public URL for the /twiml route
        const url = await ngrok.connect(5000); // Exposing local port 5000
        console.log('✅ ngrok URL :', url);

        // Make the call using the Twilio API
        const call = await client.calls.create({
            to: `+${targetNumber}`, // Use the target number dynamically
            from: twilioNumber,
            url: `${url}/twiml`,  // URL for the TwiML response
        });

        console.log(`📞 Call initiated. SID: ${call.sid}`);
        res.json({ message: 'Call initiated', callSid: call.sid });
    } catch (error) {
        console.error('Error making the call:', error);
        res.status(500).json({ error: 'Error making the call', details: error });
    }
});

module.exports = router;

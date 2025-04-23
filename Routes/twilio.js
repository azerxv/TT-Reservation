const express = require('express');
const router = express.Router();
const { Response } = require('twilio');

// Define the /twiml route for the TwiML response
router.post('/', (req, res) => {
    console.log('✅ Twilio is calling this route!');  // For debugging
    
    const response = new Response();
    response.say({ voice: 'alice', language: 'en-US' }, 'Hello! This is a test call from Twilio and Node.js.');
    
    // Return the TwiML response
    res.type('text/xml');
    res.send(response.toString());
});

module.exports = router;

// routes/twiml.js
const express = require('express');
const router = express.Router();
const { Response } = require('twilio').twiml;

router.get('/twiml', (req, res) => {
    const twiml = new Response();

    // Add a 'Say' verb to read a message to the call recipient
    twiml.say(
        {
            voice: 'alice',  // You can change the voice here
            language: 'en-US',
        },
        'Hello! This is a test call from Twilio and your Node.js app.'
    );

    res.type('application/xml');
    res.send(twiml.toString());
});

module.exports = router;

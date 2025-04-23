const express = require('express');
const axios = require('axios');
const router = express.Router();

// Load API Key from environment variables
require('dotenv').config();

// Gemini API URL and key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';
const API_KEY = process.env.GEMINI_API_KEY; // Store it in .env file

// POST route to communicate with Gemini API
router.post('/', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Send request to Gemini API
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: userMessage }],
                        role: 'user',
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract the bot's reply from the response
        const botReply = response.data.candidates[0].content.parts[0].text;

        // Send the bot's response back to the client
        res.json({ reply: botReply });

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error communicating with Gemini API' });
    }
});

module.exports = router;

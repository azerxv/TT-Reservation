const express = require('express');
const axios = require('axios');
const app = express();
const port = 4600;

require('dotenv').config(); // To load API key from .env

app.use(express.json());

// Gemini API endpoint and key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';
const API_KEY = process.env.GEMINI_API_KEY; // store it in .env
// OR you can hardcode it like: const API_KEY = 'AIza...'; (not recommended)

app.post('/api/chat', async (req, res) => {
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

    // Get the actual bot reply from Gemini's response
    const botReply = response.data.candidates[0].content.parts[0].text;

    // Send the response back to the client
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error communicating with Gemini API' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
